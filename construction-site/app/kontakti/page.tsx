import AnimatedSection from "@/components/AnimatedSection";
import LogoWatermark from "@/components/LogoWatermark";

export const metadata = {
  title: "Контакти — StroiPro BG | Свържете се с нас",
  description:
    "Свържете се с StroiPro BG за безплатна консултация. Телефон: +359 888 123 456, Email: office@stroipro.bg",
};

export default function KontaktiPage() {
  return (
    <main className="min-h-screen bg-slate-950 relative overflow-hidden">
      <LogoWatermark />
      {/* Same perspective grid as homepage */}
      <div
        className="absolute inset-0 z-0 opacity-40 pointer-events-none"
        style={{
          backgroundSize: "60px 60px",
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
          transform: "perspective(600px) rotateX(15deg) scale(1.5)",
          transformOrigin: "center 70%",
        }}
      />

      {/* Ambient glow */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-slate-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 pt-32 pb-20 px-4 md:px-10 max-w-7xl mx-auto">
        {/* Hero Section */}
        <AnimatedSection>
          <header className="mb-16 text-center md:text-left">
            <span className="inline-block px-4 py-1 mb-4 text-xs font-bold tracking-widest uppercase bg-amber-500/20 border border-amber-500/30 text-amber-500 rounded-full">
              Връзка с нас
            </span>
            <h1 className="text-4xl md:text-7xl font-black text-white tracking-tighter leading-none mb-6 font-montserrat">
              Свържете се с нас
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl leading-relaxed">
              Вашето строително приключение започва тук. Независимо дали
              планирате нов дом или мащабен ремонт, нашият екип е готов да
              материализира Вашата визия с безкомпромисна прецизност.
            </p>
          </header>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Contact Info Column */}
          <div className="lg:col-span-5 space-y-8">
            {/* Phone Card */}
            <AnimatedSection delay={0.1}>
              <a
                href="tel:+359888123456"
                className="group block p-8 bg-slate-900/80 backdrop-blur-md border border-white/5 rounded-xl hover:border-amber-500/20 hover:shadow-xl hover:shadow-amber-500/5 transition-all duration-500 relative overflow-hidden"
              >
                <div className="relative z-10">
                  <span
                    className="material-symbols-outlined text-amber-500 text-4xl mb-4 block"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    call
                  </span>
                  <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-2 font-montserrat">
                    Телефон за връзка
                  </h3>
                  <p className="text-2xl font-extrabold text-white">
                    +359 888 123 456
                  </p>
                </div>
                <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity text-white">
                  <span className="material-symbols-outlined text-[120px]">
                    call
                  </span>
                </div>
              </a>
            </AnimatedSection>

            {/* Email Card */}
            <AnimatedSection delay={0.2}>
              <a
                href="mailto:office@stroipro.bg"
                className="group block p-8 bg-slate-800/60 backdrop-blur-md border border-white/5 rounded-xl hover:border-amber-500/20 hover:shadow-xl hover:shadow-amber-500/5 transition-all duration-500 relative overflow-hidden"
              >
                <div className="relative z-10">
                  <span
                    className="material-symbols-outlined text-amber-500 text-4xl mb-4 block"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    mail
                  </span>
                  <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-2 font-montserrat">
                    Имейл адрес
                  </h3>
                  <p className="text-2xl font-extrabold text-white">
                    office@stroipro.bg
                  </p>
                </div>
                <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity text-white">
                  <span className="material-symbols-outlined text-[120px]">
                    mail
                  </span>
                </div>
              </a>
            </AnimatedSection>

            {/* Business Hours & Socials */}
            <AnimatedSection delay={0.3}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-6 bg-slate-900/60 backdrop-blur-md border border-white/5 rounded-lg">
                  <span className="material-symbols-outlined text-amber-500 mb-3 block">
                    schedule
                  </span>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 font-montserrat">
                    Работно време
                  </h4>
                  <p className="font-bold text-white">Пон-Пет</p>
                  <p className="text-slate-400">08:00 – 18:00 ч.</p>
                </div>
                <div className="p-6 bg-slate-900/60 backdrop-blur-md border border-white/5 rounded-lg flex flex-col justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3 font-montserrat">
                    Социални мрежи
                  </h4>
                  <div className="flex gap-4">
                    <a
                      href="#"
                      className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-300 hover:bg-amber-500 hover:text-slate-900 transition-all"
                    >
                      <span className="material-symbols-outlined">share</span>
                    </a>
                    <a
                      href="#"
                      className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-300 hover:bg-amber-500 hover:text-slate-900 transition-all"
                    >
                      <span className="material-symbols-outlined">public</span>
                    </a>
                    <a
                      href="#"
                      className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-300 hover:bg-amber-500 hover:text-slate-900 transition-all"
                    >
                      <span className="material-symbols-outlined">
                        photo_camera
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* Right Column - Info Card */}
          <AnimatedSection className="lg:col-span-7" delay={0.2}>
            <div className="bg-slate-900/80 backdrop-blur-md border border-white/5 rounded-xl p-8 md:p-12 h-full">
              <div className="mb-10">
                <h2 className="text-3xl font-bold tracking-tight text-white mb-2 font-montserrat">
                  Как можем да помогнем?
                </h2>
                <p className="text-slate-400">
                  Свържете се с нас по телефон или имейл и наш консултант ще
                  отговори до 24 часа.
                </p>
              </div>

              <div className="space-y-8">
                {/* Services we offer */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 font-montserrat">
                    Нашите услуги включват
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      "Жилищно строителство",
                      "Индустриални обекти",
                      "Луксозни ремонти",
                      "Проектиране и надзор",
                      "Покривни системи",
                      "Огради и ограждения",
                    ].map((service) => (
                      <div
                        key={service}
                        className="flex items-center gap-3 p-4 bg-white/5 rounded-xl"
                      >
                        <span
                          className="material-symbols-outlined text-amber-500 text-sm"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          check_circle
                        </span>
                        <span className="text-sm font-medium text-slate-200">
                          {service}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Contact Info */}
                <div className="bg-white/5 rounded-xl p-8">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 font-montserrat">
                    Бърз контакт
                  </h3>
                  <div className="space-y-4">
                    <a
                      href="tel:+359888123456"
                      className="flex items-center gap-4 text-white hover:text-amber-500 transition-colors"
                    >
                      <span className="material-symbols-outlined text-amber-500">
                        call
                      </span>
                      <span className="text-lg font-bold">
                        +359 888 123 456
                      </span>
                    </a>
                    <a
                      href="mailto:office@stroipro.bg"
                      className="flex items-center gap-4 text-white hover:text-amber-500 transition-colors"
                    >
                      <span className="material-symbols-outlined text-amber-500">
                        mail
                      </span>
                      <span className="text-lg font-bold">
                        office@stroipro.bg
                      </span>
                    </a>
                  </div>
                </div>

                {/* CTA */}
                <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-8 text-center">
                  <h3 className="text-xl font-bold text-white mb-2 font-montserrat">
                    Готови за следващата стъпка?
                  </h3>
                  <p className="text-slate-400 text-sm mb-6">
                    Обадете ни се директно за най-бърз отговор
                  </p>
                  <a
                    href="tel:+359888123456"
                    className="inline-flex items-center gap-2 bg-amber-500 text-slate-950 px-8 py-4 rounded-full font-montserrat text-sm font-bold uppercase tracking-widest hover:scale-105 transition-all"
                  >
                    <span className="material-symbols-outlined">call</span>
                    Обадете се сега
                  </a>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </main>
  );
}
