import { StyledComponentsProvider } from '../providers/StyledComponentsProvider'
import DeviceDetector from '@/components/DeviceDetector'
import { Poppins } from 'next/font/google'
import type { Metadata } from 'next'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700', '800', '900'],
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: 'Portal do Estudante - Multischool',
  description: 'Portal do Estudante',
}

export default function RootLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
    <html lang="pt" className={poppins.variable}>
      <body>
        <StyledComponentsProvider>
          <DeviceDetector maxMobileWidth={468}>
            {children}
          </DeviceDetector>
        </StyledComponentsProvider>
      </body>
    </html>
  )
}