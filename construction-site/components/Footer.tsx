import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full pt-20 pb-10 bg-slate-900">
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <Image
            src="/logo-light.png"
            alt="StroiPro BG"
            width={180}
            height={60}
            className="h-14 w-auto mb-4"
          />
          <p className="font-montserrat leading-relaxed text-slate-300 max-w-sm mb-8">
            Ние вярваме, че строителството е изкуство, което изисква търпение,
            умение и безкомпромисно качество.
          </p>
          <div className="flex gap-4">
            <a
              href="#"
              className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center hover:bg-amber-500 hover:text-slate-900 transition-all text-slate-300"
            >
              <span className="material-symbols-outlined text-xl">public</span>
            </a>
            <a
              href="mailto:office@stroipro.bg"
              className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center hover:bg-amber-500 hover:text-slate-900 transition-all text-slate-300"
            >
              <span className="material-symbols-outlined text-xl">
                alternate_email
              </span>
            </a>
            <a
              href="tel:+359888123456"
              className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center hover:bg-amber-500 hover:text-slate-900 transition-all text-slate-300"
            >
              <span className="material-symbols-outlined text-xl">call</span>
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-amber-500 font-bold uppercase text-xs tracking-widest mb-6 font-montserrat">
            Бързи връзки
          </h4>
          <ul className="space-y-4">
            <li>
              <Link
                href="/"
                className="font-montserrat leading-relaxed text-slate-400 hover:text-slate-100 transition-colors"
              >
                Начало
              </Link>
            </li>
            <li>
              <Link
                href="/uslugi"
                className="font-montserrat leading-relaxed text-slate-400 hover:text-slate-100 transition-colors"
              >
                Нашите Услуги
              </Link>
            </li>
            <li>
              <Link
                href="/kontakti"
                className="font-montserrat leading-relaxed text-slate-400 hover:text-slate-100 transition-colors"
              >
                Започнете Вашия Проект
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-amber-500 font-bold uppercase text-xs tracking-widest mb-6 font-montserrat">
            Контакти
          </h4>
          <ul className="space-y-4 text-slate-400">
            <li className="flex items-start gap-3">
              <span className="material-symbols-outlined text-amber-500 text-xl">
                phone_iphone
              </span>
              <span>+359 888 123 456</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="material-symbols-outlined text-amber-500 text-xl">
                mail
              </span>
              <span>office@stroipro.bg</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 mt-20 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="font-montserrat leading-relaxed text-slate-500 text-sm">
          &copy; 2024 StroiPro BG. Всички права запазени. Елитно строителство и
          прецизност.
        </p>
        <div className="flex gap-6">
          <a
            href="#"
            className="text-slate-500 hover:text-amber-500 text-xs font-montserrat transition-colors"
          >
            Политика за поверителност
          </a>
          <a
            href="#"
            className="text-slate-500 hover:text-amber-500 text-xs font-montserrat transition-colors"
          >
            Общи условия
          </a>
        </div>
      </div>
    </footer>
  );
}
