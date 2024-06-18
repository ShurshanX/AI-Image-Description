import Script from "next/script";
export default function DonateButton() {
  return (
    <>
    <Script id="ko-fi-script" strategy="beforeInteractive" src='https://storage.ko-fi.com/cdn/scripts/overlay-widget.js'></Script>
    <Script id="ko-fi-button" dangerouslySetInnerHTML={{__html:`kofiWidgetOverlay.draw('imgdesgen', {
            'type':'floating-chat',
            'floating-chat.donateButton.text': 'Support me',
            'floating-chat.donateButton.background-color': '#00b9fe',
            'floating-chat.donateButton.text-color': '#fff'
        })`}}>
       
    </Script>
    </>
  );
}