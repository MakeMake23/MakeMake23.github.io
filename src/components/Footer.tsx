import Image from "next/image";
import Link from "next/link";
import AnimatedComponent from "@/components/AnimatedComponent";
import dubaiText from "@/assets/images/dubai-text.png";

interface FooterProps {
  dict: any;
  appVersion?: string;
}

const Footer = ({ dict, appVersion }: FooterProps) => {
  return (
    <AnimatedComponent>
      <footer className="mt-12 py-4 text-center text-gray-500 dark:text-gray-400">
        <p>
          &copy; {new Date().getFullYear()} {dict.footer.footer_made_with}{" "}
          <span className="animate-heartbeat">❤️</span> {dict.footer.footer_in}
          <Image
            src={dubaiText}
            alt="Dubai"
            className="inline-block h-8 w-auto relative -top-[8px] mb-0 mx-1"
          />
          {dict.footer.afterDubai}. {dict.footer.rights}
        </p>
        {appVersion && (
          <p className="text-sm text-gray-500 mt-2">
            {dict.footer.version} {appVersion}
          </p>
        )}
        <div className="mt-10 flex justify-center items-center space-x-4">
          <Link
            href="/privacy"
            className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
          >
            {dict.footer.privacy_policy}
          </Link>
          <span className="text-gray-400">|</span>
          <Link
            href="/#links"
            className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
          >
            {dict.footer.contact}
          </Link>
          <span className="text-gray-400">|</span>
          <Link
            href="/blog"
            className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
          >
            {dict.footer.blog}
          </Link>
        </div>
      </footer>
    </AnimatedComponent>
  );
};

export default Footer;
