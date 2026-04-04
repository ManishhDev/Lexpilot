// layout.tsx
import type React from "react"
import type { Metadata } from "next"
import { Baskervville, Montserrat} from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/lib/auth-context"
import { Web3Provider } from "@/lib/web3-provider"
import { LayoutWrapper } from "@/components/layout-wrapper"

const baskervville = Baskervville({
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic", "normal"],
  variable: "--font-baskervville",
});
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic", "normal"],
  variable: "--font-montserrat",
});
export const metadata: Metadata = {
  title: "LegalEase - AI-Powered Legal Compliance for Indian Startups",
  description:
    "Automate your legal workflows with AI. Draft contracts, track compliance, and handle payments - all in one platform built for Indian startups and SMEs.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const hydrationAttrCleanupScript = `
    (function () {
      var ATTRS = ["bis_skin_checked", "bis_register"];

      function clean(root) {
        var scope = root && root.querySelectorAll ? root : document;
        for (var i = 0; i < ATTRS.length; i++) {
          var attr = ATTRS[i];
          if (scope.documentElement && scope.documentElement.hasAttribute && scope.documentElement.hasAttribute(attr)) {
            scope.documentElement.removeAttribute(attr);
          }
          if (scope.body && scope.body.hasAttribute && scope.body.hasAttribute(attr)) {
            scope.body.removeAttribute(attr);
          }
          var nodes = scope.querySelectorAll ? scope.querySelectorAll("[" + attr + "]") : [];
          for (var j = 0; j < nodes.length; j++) {
            nodes[j].removeAttribute(attr);
          }
        }
      }

      clean(document);

      var observer = new MutationObserver(function (mutations) {
        for (var i = 0; i < mutations.length; i++) {
          var mutation = mutations[i];
          if (mutation.type === "attributes" && ATTRS.indexOf(mutation.attributeName) !== -1) {
            mutation.target.removeAttribute(mutation.attributeName);
          }
          if (mutation.type === "childList" && mutation.addedNodes && mutation.addedNodes.length) {
            for (var j = 0; j < mutation.addedNodes.length; j++) {
              var node = mutation.addedNodes[j];
              if (node && node.nodeType === 1) {
                clean(node);
              }
            }
          }
        }
      });

      observer.observe(document.documentElement, {
        childList: true,
        attributes: true,
        subtree: true,
        attributeFilter: ATTRS,
      });

      var intervalId = window.setInterval(function () {
        clean(document);
      }, 150);

      window.addEventListener("load", function () {
        window.clearInterval(intervalId);
        clean(document);
        observer.disconnect();
      }, { once: true });
    })();
  `

  return (
    <html lang="en" className="light" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: hydrationAttrCleanupScript }} />
      </head>
      <body suppressHydrationWarning>
        <Web3Provider>
          <AuthProvider>
            <LayoutWrapper>{children}</LayoutWrapper>
          </AuthProvider>
        </Web3Provider>
      </body>
    </html>
  )
}
