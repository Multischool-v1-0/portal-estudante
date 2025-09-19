// services/pdfService.ts
export interface Transaction {
  title: string;
  date: string;
  amount: string;
  isPositive: boolean;
}

export interface UserInfo {
  fullName: string;
  accountType?: string;
  address?: string;
  city?: string;
  country?: string;
}

class PDFService {
  private formatCurrency(amount: string): number {
    return parseFloat(amount.replace(/[^\d,.-]/g, '').replace(',', '.'));
  }

  private calculateSummary(transactions: Transaction[]) {
    const credits = transactions
      .filter(t => t.isPositive)
      .reduce((acc, t) => acc + Math.abs(this.formatCurrency(t.amount)), 0);
    
    const debits = transactions
      .filter(t => !t.isPositive)
      .reduce((acc, t) => acc + Math.abs(this.formatCurrency(t.amount)), 0);
    
    const balance = credits - debits;
    
    return { credits, debits, balance };
  }

  // Método que REALMENTE baixa um arquivo com design moderno
  public downloadExtract(user: UserInfo, transactions: Transaction[]): void {
    const { credits, debits, balance } = this.calculateSummary(transactions);
    
    // Criar conteúdo do extracto em formato texto
    let extractContent = '';
    extractContent += '='.repeat(60) + '\n';
    extractContent += '           EXTRACTO DE MOVIMENTOS\n';
    extractContent += '='.repeat(60) + '\n\n';
    
    extractContent += `Nome: ${user.fullName}\n`;
    extractContent += `Conta: ${user.accountType || 'Multischool'}\n`;
    extractContent += `Data: ${new Date().toLocaleDateString('pt-BR')}\n`;
    extractContent += `Hora: ${new Date().toLocaleTimeString('pt-BR')}\n\n`;
    
    extractContent += '-'.repeat(60) + '\n';
    extractContent += 'DESCRIÇÃO'.padEnd(25) + 'DATA'.padEnd(15) + 'MONTANTE'.padStart(20) + '\n';
    extractContent += '-'.repeat(60) + '\n';
    
    transactions.forEach(transaction => {
      const desc = transaction.title.length > 24 ? transaction.title.substring(0, 21) + '...' : transaction.title;
      const date = transaction.date.length > 14 ? transaction.date.substring(0, 11) + '...' : transaction.date;
      
      extractContent += desc.padEnd(25);
      extractContent += date.padEnd(15);
      extractContent += transaction.amount.padStart(20) + '\n';
    });
    
    extractContent += '-'.repeat(60) + '\n\n';
    
    extractContent += 'RESUMO FINANCEIRO:\n';
    extractContent += '-'.repeat(30) + '\n';
    extractContent += `Total Créditos: +${credits.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} kz\n`;
    extractContent += `Total Débitos:  -${debits.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} kz\n`;
    extractContent += `Saldo Final:    ${balance >= 0 ? '+' : ''}${balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} kz\n\n`;
    
    extractContent += '-'.repeat(60) + '\n';
    extractContent += 'Documento gerado automaticamente pela plataforma Multischool\n';
    extractContent += `ID: ${Math.random().toString(36).substring(2, 10).toUpperCase()}\n`;
    
    // Forçar download
    this.forceDownload(extractContent, this.generateFileName(user.fullName, 'txt'));
  }

  // Método com design moderno inspirado no invoice
  public downloadModernExtract(user: UserInfo, transactions: Transaction[]): void {
    const { credits, debits, balance } = this.calculateSummary(transactions);
    const currentDate = new Date();
    const extractId = Math.random().toString(36).substring(2, 10).toUpperCase();
    
    const htmlContent = `<!DOCTYPE html>
<html lang="pt">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Extracto - ${user.fullName}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }
        
        .invoice-container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
            position: relative;
        }
        
        .header {
            background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
            padding: 40px;
            position: relative;
            overflow: hidden;
        }
        
        .header::before {
            content: '';
            position: absolute;
            top: -50%;
            right: -20px;
            width: 200px;
            height: 200px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 50%;
        }
        
        .header::after {
            content: '';
            position: absolute;
            bottom: -30%;
            right: 100px;
            width: 150px;
            height: 150px;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 50%;
        }
        
        .logo-section {
            display: flex;
            align-items: center;
            margin-bottom: 30px;
            position: relative;
            z-index: 2;
        }
        
        .logo {
            width: 60px;
            height: 60px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 15px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 15px;
            font-size: 24px;
            font-weight: bold;
            color: white;
        }
        
        .company-name {
            color: white;
            font-size: 28px;
            font-weight: 300;
            letter-spacing: 1px;
        }
        
        .company-tagline {
            color: rgba(255, 255, 255, 0.8);
            font-size: 14px;
            margin-top: 5px;
        }
        
        .invoice-title {
            color: white;
            font-size: 48px;
            font-weight: 700;
            text-align: right;
            position: relative;
            z-index: 2;
        }
        
        .invoice-date {
            color: rgba(255, 255, 255, 0.9);
            text-align: right;
            font-size: 18px;
            margin-top: 10px;
            position: relative;
            z-index: 2;
        }
        
        .content {
            padding: 40px;
        }
        
        .client-info {
            display: flex;
            justify-content: space-between;
            margin-bottom: 40px;
            padding-bottom: 20px;
            border-bottom: 2px solid #f0f0f0;
        }
        
        .client-details h3 {
            color: #333;
            font-size: 18px;
            margin-bottom: 15px;
            font-weight: 600;
        }
        
        .client-details p {
            color: #666;
            margin-bottom: 8px;
            font-size: 16px;
        }
        
        .extract-number {
            text-align: right;
        }
        
        .extract-number h4 {
            color: #333;
            font-size: 16px;
            margin-bottom: 5px;
        }
        
        .extract-number p {
            color: #ff6b35;
            font-size: 18px;
            font-weight: 600;
        }
        
        .transactions-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 30px;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
        }
        
        .transactions-table thead {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        
        .transactions-table th {
            padding: 20px;
            text-align: left;
            color: white;
            font-weight: 600;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        .transactions-table th:last-child {
            text-align: right;
        }
        
        .transactions-table td {
            padding: 20px;
            border-bottom: 1px solid #f0f0f0;
            font-size: 15px;
        }
        
        .transactions-table tbody tr:hover {
            background: #f8f9ff;
        }
        
        .transaction-title {
            font-weight: 600;
            color: #333;
            margin-bottom: 5px;
        }
        
        .transaction-date {
            color: #888;
            font-size: 13px;
        }
        
        .amount-positive {
            color: #28a745;
            font-weight: 700;
            font-size: 16px;
        }
        
        .amount-negative {
            color: #dc3545;
            font-weight: 700;
            font-size: 16px;
        }
        
        .summary-section {
            background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
            padding: 30px;
            border-radius: 15px;
            margin-bottom: 30px;
            border: 2px solid #dee2e6;
        }
        
        .summary-title {
            color: #333;
            font-size: 24px;
            font-weight: 600;
            margin-bottom: 20px;
            text-align: center;
        }
        
        .summary-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px 0;
            border-bottom: 1px solid #dee2e6;
            font-size: 18px;
        }
        
        .summary-row:last-child {
            border-bottom: none;
            border-top: 2px solid #ff6b35;
            margin-top: 10px;
            padding-top: 20px;
            font-weight: 700;
            font-size: 20px;
        }
        
        .summary-label {
            color: #495057;
        }
        
        .summary-value {
            font-weight: 600;
        }
        
        .summary-value.positive {
            color: #28a745;
        }
        
        .summary-value.negative {
            color: #dc3545;
        }
        
        .summary-value.balance {
            background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
            color: white;
            padding: 10px 20px;
            border-radius: 25px;
            font-size: 18px;
        }
        
        .footer {
            text-align: center;
            padding-top: 20px;
            border-top: 1px solid #e9ecef;
            color: #6c757d;
        }
        
        .footer p {
            margin-bottom: 5px;
            font-size: 14px;
        }
        
        .print-info {
            color: #ff6b35;
            font-weight: 600;
            margin-top: 10px;
        }
        
        @media print {
            body {
                background: white;
                padding: 0;
            }
            
            .invoice-container {
                box-shadow: none;
                border-radius: 0;
            }
            
            .print-info {
                display: none;
            }
        }
        
        @media (max-width: 768px) {
            .client-info {
                flex-direction: column;
                gap: 20px;
            }
            
            .invoice-title {
                font-size: 36px;
                text-align: left;
                margin-top: 20px;
            }
            
            .transactions-table th,
            .transactions-table td {
                padding: 15px 10px;
                font-size: 14px;
            }
        }
    </style>
</head>
<body>
    <div class="invoice-container">
        <div class="header">
            <div class="logo-section">
                <div class="logo">MS</div>
                <div>
                    <div class="company-name">Multischool</div>
                    <div class="company-tagline">Sistema de Gestão Escolar</div>
                </div>
            </div>
            <div class="invoice-title">EXTRACTO</div>
            <div class="invoice-date">${currentDate.toLocaleDateString('pt', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</div>
        </div>
        
        <div class="content">
            <div class="client-info">
                <div class="client-details">
                    <h3>PARA:</h3>
                    <p><strong>${user.fullName}</strong></p>
                    <p>${user.accountType || 'Conta Multischool'}</p>
                    ${user.address ? `<p>${user.address}</p>` : ''}
                    ${user.city ? `<p>${user.city}, ${user.country || 'Angola'}</p>` : ''}
                </div>
                <div class="extract-number">
                    <h4>EXTRACTO Nº</h4>
                    <p>EXT.${extractId}</p>
                    <h4 style="margin-top: 20px;">DATA DE EMISSÃO</h4>
                    <p>${currentDate.toLocaleDateString('pt-BR')}</p>
                </div>
            </div>
            
            <table class="transactions-table">
                <thead>
                    <tr>
                        <th>DESCRIÇÃO</th>
                        <th>DATA</th>
                        <th>MONTANTE</th>
                    </tr>
                </thead>
                <tbody>
                    ${transactions.map(transaction => `
                        <tr>
                            <td>
                                <div class="transaction-title">${transaction.title}</div>
                            </td>
                            <td>
                                <div class="transaction-date">${transaction.date}</div>
                            </td>
                            <td style="text-align: right;">
                                <div class="${transaction.isPositive ? 'amount-positive' : 'amount-negative'}">
                                    ${transaction.amount}
                                </div>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
            
            <div class="summary-section">
                <h3 class="summary-title">Resumo Financeiro</h3>
                
                <div class="summary-row">
                    <span class="summary-label">Total de Créditos</span>
                    <span class="summary-value positive">+${credits.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} kz</span>
                </div>
                
                <div class="summary-row">
                    <span class="summary-label">Total de Débitos</span>
                    <span class="summary-value negative">-${debits.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} kz</span>
                </div>
                
                <div class="summary-row">
                    <span class="summary-label">SALDO FINAL</span>
                    <span class="summary-value balance">
                        ${balance >= 0 ? '+' : ''}${balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} kz
                    </span>
                </div>
            </div>
            
            <div class="footer">
                <p>Documento gerado automaticamente pela plataforma Multischool</p>
                <p>ID do Documento: ${extractId} | Gerado em ${currentDate.toLocaleString('pt-BR')}</p>
                <p class="print-info">Para converter em PDF: Ctrl+P → Destino: Salvar como PDF</p>
            </div>
        </div>
    </div>
</body>
</html>`;

    this.forceDownload(htmlContent, this.generateFileName(user.fullName, 'html'));
  }

  // Método que FORÇA o download - funciona sempre!
  private forceDownload(content: string, filename: string): void {
    try {
      // Criar blob com o conteúdo
      const blob = new Blob([content], { 
        type: filename.endsWith('.html') ? 'text/html;charset=utf-8' : 'text/plain;charset=utf-8' 
      });
      
      // Criar URL temporária
      const url = URL.createObjectURL(blob);
      
      // Criar link invisível e forçar clique
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.style.display = 'none';
      
      // Adicionar ao DOM, clicar e remover
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Limpar URL temporária
      setTimeout(() => URL.revokeObjectURL(url), 100);
      
      console.log(`✅ Download iniciado: ${filename}`);
      
    } catch (error) {
      console.error('❌ Erro no download:', error);
      
      // Fallback extremo: abrir em nova aba
      const newWindow = window.open('', '_blank');
      if (newWindow) {
        newWindow.document.write(content);
        newWindow.document.close();
      }
      
      throw new Error('Erro no download do extracto');
    }
  }

  private generateFileName(userName: string, extension: string): string {
    const now = new Date();
    const date = now.toISOString().split('T')[0];
    const time = now.toTimeString().split(':').slice(0, 2).join('h');
    
    const sanitizedName = userName
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove acentos
      .replace(/[^a-z0-9\s]/g, '') // Remove caracteres especiais
      .replace(/\s+/g, '_') // Substitui espaços por underscore
      .substring(0, 20); // Limita tamanho
    
    return `extracto_${sanitizedName}_${date}_${time}.${extension}`;
  }
}

// Instância singleton
export const pdfService = new PDFService();

// Hook personalizado com novo método
export const usePDFGenerator = () => {
  const generateModernExtract = async (user: UserInfo, transactions: Transaction[]) => {
    try {
      // Usa o novo design moderno
      pdfService.downloadModernExtract(user, transactions);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Erro no download' 
      };
    }
  };

  const generateExtract = async (user: UserInfo, transactions: Transaction[]) => {
    try {
      // Usa o design moderno por padrão
      pdfService.downloadModernExtract(user, transactions);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Erro no download' 
      };
    }
  };

  const downloadTextOnly = (user: UserInfo, transactions: Transaction[]) => {
    try {
      pdfService.downloadExtract(user, transactions);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Erro no download' 
      };
    }
  };

  return { generateModernExtract, generateExtract, downloadTextOnly };
};