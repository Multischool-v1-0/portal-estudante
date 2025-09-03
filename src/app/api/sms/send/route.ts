// app/api/sms/send/route.ts
import { NextRequest, NextResponse } from "next/server";
import twilio from "twilio";

// Configuração do Twilio
// Substituir a verificação inicial por:
let client: any = null;

// Função para inicializar o cliente Twilio
const initializeTwilioClient = () => {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
  const twilioWhatsAppNumber = process.env.TWILIO_WHATSAPP_NUMBER;

  if (!accountSid || !authToken || !twilioPhoneNumber) {
    throw new Error("Variáveis de ambiente do Twilio não configuradas");
  }

  return {
    client: twilio(accountSid, authToken),
    twilioPhoneNumber,
    twilioWhatsAppNumber,
  };
};

// Armazenamento temporário dos códigos (em produção, use Redis ou banco de dados)
const verificationCodes = new Map<
  string,
  { code: string; expires: number; attempts: number; method?: string }
>();

// Função para gerar código de 4 dígitos
const generateVerificationCode = (): string => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};

// Função para validar número de telefone angolano
const validateAngolanPhoneNumber = (phoneNumber: string): boolean => {
  const cleanNumber = phoneNumber.replace(/\s+/g, "");
  return /^\+244\d{9}$/.test(cleanNumber);
};

// Função para formatar número para WhatsApp
const formatWhatsAppNumber = (phoneNumber: string): string => {
  return `whatsapp:${phoneNumber}`;
};

export async function POST(request: NextRequest) {
  try {
    const { client, twilioPhoneNumber, twilioWhatsAppNumber } =
      initializeTwilioClient();

    // Debug - remova após resolver
    // console.log('=== CONFIGURAÇÃO TWILIO (CHECK)===');
    // console.log('Account SID:', accountSid);
    // console.log('SMS Phone Number:', twilioPhoneNumber);
    // console.log('WhatsApp Number:', twilioWhatsAppNumber);
    // console.log('Auth Token definido:', !!authToken);

    try {
      const body = await request.json();
      const { phoneNumber, action = "send", method = "sms" } = body;

      if (!phoneNumber) {
        return NextResponse.json(
          { success: false, error: "Número de telefone é obrigatório" },
          { status: 400 }
        );
      }

      // Validar método
      if (!["sms", "whatsapp"].includes(method)) {
        return NextResponse.json(
          { success: false, error: 'Método deve ser "sms" ou "whatsapp"' },
          { status: 400 }
        );
      }

      // Validar formato do número
      if (!validateAngolanPhoneNumber(phoneNumber)) {
        return NextResponse.json(
          { success: false, error: "Formato de número de telefone inválido" },
          { status: 400 }
        );
      }

      // Verificar se WhatsApp está disponível quando solicitado
      if (method === "whatsapp" && !twilioWhatsAppNumber) {
        return NextResponse.json(
          {
            success: false,
            error: "WhatsApp não está configurado. Tente SMS.",
          },
          { status: 400 }
        );
      }

      if (action === "send") {
        // Verificar o limite de tentativas (máximo 3 por hora)
        const existing = verificationCodes.get(phoneNumber);
        if (existing && existing.attempts >= 3) {
          const timeLeft = Math.ceil((existing.expires - Date.now()) / 60000);
          return NextResponse.json(
            {
              success: false,
              error: `Muitas tentativas. Tente novamente em ${timeLeft} minutos.`,
            },
            { status: 429 }
          );
        }

        const verificationCode = generateVerificationCode();
        const expirationTime = Date.now() + 10 * 60 * 1000; // 10 minutos

        // Armazenar o código com o método usado
        verificationCodes.set(phoneNumber, {
          code: verificationCode,
          expires: expirationTime,
          attempts: existing ? existing.attempts + 1 : 1,
          method: method,
        });

        // Configurar mensagem baseada no método
        const messageBody =
          method === "whatsapp"
            ? `🎓 *Multischool Angola* - Verificação da Conta \n\nO seu código de verificação é: *${verificationCode}*\n\n_Este código é válido por 10 minutos (não partilhe com ninguém)._`
            : `O seu código de verificação Multischool é: ${verificationCode}. Válido por 10 minutos.`;

        // Configurar remetente baseado no método
        let fromNumber: string;
        let toNumber: string;

        if (method === "whatsapp") {
          // Para WhatsApp, usar o número específico do WhatsApp ou fallback para SMS
          const whatsappSender = twilioWhatsAppNumber || twilioPhoneNumber!;
          fromNumber = formatWhatsAppNumber(whatsappSender);
          toNumber = formatWhatsAppNumber(phoneNumber);
        } else {
          fromNumber = twilioPhoneNumber!;
          toNumber = phoneNumber;
        }

        // Enviar via Twilio
        try {
          console.log(`=== TENTATIVA DE ENVIO ${method.toUpperCase()} ===`);
          console.log("From Number:", fromNumber);
          console.log("To Number:", toNumber);
          console.log("Message Body:", messageBody);
          console.log("Method:", method);

          const messageConfig = {
            body: messageBody,
            from: fromNumber,
            to: toNumber,
          };

          console.log("Message Config:", messageConfig);

          const message = await client.messages.create(messageConfig);

          console.log(`${method.toUpperCase()} enviado com sucesso:`, {
            sid: message.sid,
            status: message.status,
            method: method,
          });

          return NextResponse.json({
            success: true,
            message: `Código de verificação enviado via ${method.toUpperCase()} com sucesso`,
            messageSid: message.sid,
            method: method,
            phoneNumber: phoneNumber,
          });
        } catch (twilioError: any) {
          console.error(`Erro do Twilio (${method}):`, {
            error: twilioError,
            code: twilioError.code,
            message: twilioError.message,
            details: twilioError.moreInfo,
          });

          // Tratamento de erros específicos do WhatsApp
          if (method === "whatsapp") {
            if (twilioError.code === 63016) {
              return NextResponse.json(
                {
                  success: false,
                  error:
                    "Este número não está registrado no WhatsApp Business. Tente SMS.",
                },
                { status: 400 }
              );
            } else if (
              twilioError.code === 21211 ||
              twilioError.code === 21212
            ) {
              return NextResponse.json(
                {
                  success: false,
                  error:
                    "WhatsApp não está configurado corretamente. Enviando por SMS...",
                  fallbackToSMS: true,
                },
                { status: 400 }
              );
            }
          }

          return NextResponse.json(
            {
              success: false,
              error: `Erro ao enviar ${method.toUpperCase()}. Verifique o número e tente novamente.`,
              twilioError:
                process.env.NODE_ENV === "development"
                  ? twilioError.message
                  : undefined,
            },
            { status: 500 }
          );
        }
      }

      if (action === "verify") {
        const { code } = body;

        if (!code) {
          return NextResponse.json(
            { success: false, error: "Código de verificação é obrigatório" },
            { status: 400 }
          );
        }

        const storedData = verificationCodes.get(phoneNumber);

        if (!storedData) {
          return NextResponse.json(
            {
              success: false,
              error: "Código não encontrado. Solicite um novo código.",
            },
            { status: 404 }
          );
        }

        // Verificar se o código expirou
        if (Date.now() > storedData.expires) {
          verificationCodes.delete(phoneNumber);
          return NextResponse.json(
            {
              success: false,
              error: "Código expirado. Solicite um novo código.",
            },
            { status: 410 }
          );
        }

        // Verificar se o código está correto
        if (storedData.code !== code) {
          return NextResponse.json(
            { success: false, error: "Código inválido" },
            { status: 400 }
          );
        }

        // Código válido - remover da memória
        verificationCodes.delete(phoneNumber);

        return NextResponse.json({
          success: true,
          message: "Código verificado com sucesso",
          method: storedData.method,
        });
      }

      return NextResponse.json(
        { success: false, error: "Ação inválida" },
        { status: 400 }
      );
    } catch (error) {
      console.error("Erro na API de SMS:", error);
      return NextResponse.json(
        { success: false, error: "Erro interno do servidor" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Erro na inicialização do Twilio:", error);
    return NextResponse.json(
      { success: false, error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

// Limpeza periódica de códigos expirados (executar em um cron job real)
setInterval(() => {
  const now = Date.now();
  verificationCodes.forEach((data, phoneNumber) => {
    if (now > data.expires) {
      verificationCodes.delete(phoneNumber);
      console.log(`Código expirado removido para: ${phoneNumber}`);
    }
  });
}, 5 * 60 * 1000); // Limpar a cada 5 minutos
