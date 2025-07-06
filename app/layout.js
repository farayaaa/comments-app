import InstallBootstrap from '@/components/InstallBootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import "primereact/resources/themes/lara-light-cyan/theme.css";
import '@/styles/globals.css'

export default function RootLayout({ children }) {

    return (
        <html lang="en">
            <body>
                <InstallBootstrap/>
                {children}
            </body>
        </html>
    )
}