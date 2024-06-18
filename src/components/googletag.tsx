
import Script from "next/script"
export default function GoogleTag() {
  return (
    <>
      <Script id="google-link" async src="https://www.googletagmanager.com/gtag/js?id=XXX"></Script>
      
      <Script id="google-script" dangerouslySetInnerHTML={{ __html: `window.dataLayer = window.dataLayer || [];  
          function gtag(){dataLayer.push(arguments);}  
          gtag('js', new Date());  
          gtag('config', 'XXX');` }}>
      </Script>

    </>
  )
}