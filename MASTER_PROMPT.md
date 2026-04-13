# Master Prompt — "СтройПро БГ" (StroiPro BG)

## 1. Обща визия

**Фирма:** СтройПро БГ — малка до средна строителна фирма, обслужваща частни клиенти и малък бизнес в България.

**Мисия на сайта:** Модерен, хайпер-респонсив уебсайт, който изгражда доверие, показва завършени обекти и улеснява контакта. Фокусът е върху визуалното въздействие — снимки, чисти линии, плавни анимации.

**Език:** Само български.

**Режим:** Light mode only.

**Дизайн философия:** "The Architectural Monolith" — екранът е editorial canvas. Елементите се чувстват "конструирани" — слоести, структурни и перманентни. Взаимодействие между тежък камък и леко стъкло. High-contrast типография, обширно whitespace, интенционална асиметрия.

---

## 2. Технологичен стек

| Компонент | Избор | Защо |
|-----------|-------|------|
| Framework | **Next.js 14 (App Router)** | File-based routing, SSG за бързина, лесно добавяне на нови страници |
| Styling | **Tailwind CSS** | Utility-first, перфектен за responsive дизайн |
| Анимации | **Framer Motion** | Scroll animations, page transitions, hover effects |
| Изображения | **Next/Image** | Автоматична оптимизация, lazy loading, responsive sizes |
| Данни (обекти/услуги) | **MDX файлове или JSON в `/content/`** | Лесно добавяне без CMS — просто нов файл = нова страница |
| Deployment | **Vercel** (препоръчително) | Zero-config за Next.js |
| Icons | **Lucide React** | Леки, модерни, консистентни |
| Fonts | **Google Fonts — Montserrat** | Единен шрифт — геометрична чистота, отразява архитектурни чертежи и модерна сигнализация. Работи отлично с кирилица. |

---

## 3. Дизайн система: "Elite Craftsmanship & Modern Trust"

### 3.1 Творческа посока

Дизайнът се гради на принципа **"The Architectural Monolith"**:
- **Structural Integrity:** Щедро whitespace и стриктно подравняване = стабилност
- **Quiet Luxury:** Софистикацията е в това, което ЛИПСВА. Премахваме ненужните рамки и клътър
- **The Golden Ratio:** Акцентите се използват пестеливо, но с висок импакт

### 3.2 Цветова палитра — "Midnight and Gold"

```
Primary (#0F172A / Deep Midnight Blue):    Авторитет. Hero секции, заглавия, high-impact текст.
Secondary (#C5A059 / Muted Gold):          Майсторство. Ексклузивно за CTA, смислени акценти, success states.
Background (#F8FAFC / Off-White):          Premium "gallery" усещане. По-добър от чисто бяло.
```

**Surface Hierarchy (Тонални нива за дълбочина):**
```
surface:                  #F8FAFC  — основен фон
surface-container-low:    #F1F5F9  — секции с лека разлика
surface-container:        #E2E8F0  — средно ниво
surface-container-high:   #CBD5E1  — input fields, активни зони
surface-container-lowest: #FFFFFF  — карти (най-леко ниво, "плава" над секцията)
```

**Ключови правила:**
- **НИКОГА чист черен (#000000)** — винаги Deep Midnight Blue (#0F172A) за всички "черни" елементи
- **НИКОГА 1px solid borders за секциониране** — границите се създават чрез тонални преходи между surface нивата
- **"Ghost Border"** за input fields: `outline-variant` при 15% opacity

### 3.3 Glassmorphism & Gradients

- **Hero елементи / floating навигация:** Semi-transparent `primary` (80% opacity) с `backdrop-blur: 20px`
- **CTA бутони:** Subtle linear gradient (primary → primary-container) за "душа" — избягваме плоския, евтин дигитален вид
- **Навигация:** Floating pill-shaped container с glassmorphic ефект — строителните снимки се scroll-ват красиво "зад" навигацията

### 3.4 Типография — Editorial Voice

**Шрифт:** Montserrat (единствен шрифт в системата)

| Употреба | Стил | Правила |
|----------|------|---------|
| **Display (Lg/Md)** | Headlines като "Statement Pieces" | Letter-spacing: -0.02em (tight, авторитетен) |
| **Headline & Title** | Section headers | Висок контраст primary върху surface |
| **Body (Lg/Md)** | Текстово съдържание | Line-height: 1.6 (задължително). Кирилицата е по-плътна — whitespace в параграфа е критичен |
| **Labels** | Малки етикети, категории | UPPERCASE + letter-spacing: +0.05em (технически, "blueprint" усещане) |

### 3.5 Elevation & Depth — Тонално слоене

Дълбочината се постига чрез **тонално слоене**, НЕ чрез традиционни сенки.

**Принцип на слоене:**
```
Background (surface) → Section (surface-container-low) → Card (surface-container-lowest)
```

**Ambient Shadows (само за floating елементи — модали, FAB):**
- Blur: 40px–60px
- Opacity: 4%–6%
- Цвят: деривиран от primary (Midnight Blue), НИКОГА чист черен

### 3.6 Компоненти

**Бутони (Pill-Shape):**
- Primary: Background `secondary` (Gold), Text white. Shape: `rounded-full` (Pill). Subtle gold-to-dark-gold gradient. Без shadow.
- Secondary: Background `primary` (Midnight), Text white. Shape: `rounded-full`.
- Hover: +10% luminosity shift на фона. Без промяна на border.

**Карти:**
- Radius: винаги `xl` (3rem) или `lg` (2rem) — приветлив, но модерен
- Без разделителни линии вътре. Вертикално разстояние (32px) между title и body
- Фон: `surface-container-lowest` (#FFFFFF) върху секция `surface-container-low`

**Input Fields:**
- Filled background: `surface-container-high`
- Radius: `rounded-full` или `rounded-xl`
- Active state: Ghost Border от `secondary` (Gold) при 40% opacity

**Навигация (Glassmorphic):**
- Floating pill-shaped container
- `primary` (#0F172A) при 80% opacity + heavy backdrop-blur (20px)
- Строителните снимки scroll-ват красиво "зад" навигацията

---

## 4. Структура на сайта (Sitemap)

```
/                           → Лендинг пейдж (Home)
/uslugi                     → Услуги (списък)
/portfolio                  → Портфолио (списък с обекти)
/portfolio/[slug]           → Отделен обект (галерия + описание)
/kontakti                   → Контакти
```

---

## 5. Детайлна структура по страници

### 5.1 Лендинг пейдж `/`

| Секция | Описание |
|--------|----------|
| **Hero** | Fullscreen hero с голяма строителна снимка. Glassmorphic overlay. Display заглавие с tight letter-spacing: "Майсторство. Прецизност. Резултат." Подтекст + Gold pill CTA бутон "Вижте нашите обекти". Fade-in анимация. |
| **Кратко за нас** | 2-3 изречения. Статистики с counter animation (напр. "150+ завършени обекта", "15 години опит"). Label стил (uppercase, spaced) за категориите. Surface-container-low фон за визуално отделяне. |
| **Услуги (preview)** | 3-4 карти (rounded-xl, surface-container-lowest) върху surface-container-low секция. Иконка + заглавие + кратко описание. Hover — translateY(-4px), ambient shadow се появява. Link към /uslugi. |
| **Избрани обекти (preview)** | 2-3 обекта. Голяма снимка с леко асиметрично подравняване (off-center). Hover — image zoom scale(1.05). Gold accent за типа строителство (label стил). |
| **CTA секция** | Fullwidth с primary (Midnight) фон + subtle gradient. Бял текст "Имате проект? Започнете Вашия Проект." + Gold pill бутон. Parallax ефект. |
| **Footer** | Primary фон (Midnight). Лого, телефон, имейл, социални мрежи, copyright. Бял текст, gold акценти за hover. |

### 5.2 Услуги `/uslugi`

| Елемент | Описание |
|---------|----------|
| **Header** | Заглавие "Майсторство и Прецизност" (НЕ "Нашите услуги" — следваме Elite tone). Подтекст с body-lg стил. |
| **Grid с услуги** | Responsive grid (1→2→3 col). Карти: rounded-xl, surface-container-lowest, без borders. Иконка + заглавие + описание. Staggered fade-in. |
| **Структура на данните** | `/content/services.json` — нов запис = нова услуга. |

**Начални услуги:**
1. Ново строителство — жилищни и търговски сгради от нулата
2. Ремонт и реконструкция — цялостни и частични ремонти
3. Покривни конструкции — изграждане и ремонт на покриви
4. Интериорно довършване — шпакловки, бояджийство, настилки
5. Проектиране и консултация — идеен проект, разрешителни, надзор
6. Огради и дворни конструкции — огради, навеси, подпорни стени

### 5.3 Портфолио `/portfolio`

| Елемент | Описание |
|---------|----------|
| **Header** | Заглавие "Всеки Обект е История" + подтекст. Label стил за категории. |
| **Grid с обекти** | Responsive grid. Карти: rounded-xl с cover снимка (overflow-hidden за zoom ефект), име, тип (gold label uppercase), година. Hover — image zoom + subtle ambient shadow. |
| **Филтриране** (бъдещо) | Подготвена структура за филтър по тип. |

**Начални обекти:**

1. **Къща "Сънрайз"** — Ново жилищно строителство, 2024. Модерна еднофамилна къща, 180 м², минималистичен дизайн.
2. **Офис сграда "Бизнес Парк Юг"** — Търговско строителство, 2023. Двуетажна офис сграда, 450 м².
3. **Реновация "Старият град"** — Цялостен ремонт, 2024. Реконструкция на историческа сграда, запазване на фасада.

### 5.4 Отделен обект `/portfolio/[slug]`

| Елемент | Описание |
|---------|----------|
| **Hero на обекта** | Голяма cover снимка с glassmorphic overlay + Display заглавие на обекта. |
| **Информация** | Тип (gold label), година, площ, локация. Подредени хоризонтално с generous spacing. Без разделителни линии — whitespace creates separation. |
| **Описание** | 1-2 параграфа. Body-lg с line-height 1.6. |
| **Галерия** | Grid от снимки (responsive, rounded-lg). Lightbox при клик. Леко asymmetric layout — снимки с различни размери за "custom-built" усещане. |
| **Навигация** | Pill бутони: "← Предишен" / "Следващ →". Secondary стил (Midnight). |

**Структура на данните:**
```
/content/projects/
  sunraiz.json
  biznes-park-yug.json
  stariyat-grad.json
```

Всеки файл:
```json
{
  "title": "Къща Сънрайз",
  "slug": "sunraiz",
  "type": "Ново строителство",
  "year": 2024,
  "area": "180 м²",
  "location": "София",
  "coverImage": "/images/projects/sunraiz/cover.jpg",
  "description": "Модерна еднофамилна къща...",
  "gallery": [
    "/images/projects/sunraiz/01.jpg",
    "/images/projects/sunraiz/02.jpg",
    "/images/projects/sunraiz/03.jpg"
  ]
}
```

**За добавяне на нов обект:** Нов JSON файл в `/content/projects/` → автоматично в портфолиото.

### 5.5 Контакти `/kontakti`

| Елемент | Описание |
|---------|----------|
| **Header** | Заглавие "Започнете Вашия Проект" (НЕ "Контакти" — Elite tone). |
| **Контактна информация** | Телефон (`tel:` линк), Имейл (`mailto:` линк). Големи, с Lucide иконки. Gold hover accent. Surface-container-low карта с rounded-xl. |
| **Социални мрежи** | Facebook, Instagram. Pill-shaped icon бутони с hover lift + gold accent. |
| **Работно време** | Label стил (uppercase, spaced): "РАБОТНО ВРЕМЕ" + body текст. |

---

## 6. Навигация

**Desktop:** Floating glassmorphic pill — primary (#0F172A) при 80% opacity + backdrop-blur 20px. Лого вляво, линкове вдясно. При scroll — остава floating (винаги видима).

**Линкове:** Начало | Майсторство | Портфолио | Контакт

**Mobile:** Hamburger → fullscreen overlay (primary фон, fade-in). Големи, tap-friendly линкове (бели, gold при active).

**Active state:** Gold underline или gold text color.

---

## 7. Анимации и микро-взаимодействия

| Тип | Къде | Как |
|-----|------|-----|
| **Fade-in up** | Всички секции при scroll | Framer Motion `whileInView` |
| **Staggered children** | Grid-ове (услуги, портфолио) | Карти с последователен delay |
| **Parallax** | Hero, CTA банер | Фон се движи по-бавно |
| **Hover lift** | Карти | `translateY(-4px)` + ambient shadow появяване |
| **Image zoom** | Portfolio карти | `scale(1.05)` с overflow-hidden |
| **Counter** | Статистики | Числа се "броят" нагоре при viewport entry |
| **Page transitions** | Между страниците | Fade transition |
| **Button gradient shift** | CTA бутони (Gold) | Gradient се премества при hover (luminosity +10%) |
| **Navbar glass** | Header | Винаги glassmorphic, content scroll-ва зад нея |

**Принцип:** 200-400ms, субтилни, никога не блокират. `prefers-reduced-motion` се респектира.

---

## 8. Responsive дизайн (Хайпер-респонсив)

| Breakpoint | Layout |
|------------|--------|
| **< 480px** | 1 колона. Hamburger навигация. Galeria 1 col. Display font намален. |
| **480-768px** | 1-2 колони за карти. |
| **768-1024px** | 2 колони. Side padding увеличен. |
| **1024-1280px** | 3 колони. Floating glassmorphic navbar. |
| **> 1280px** | Max-width container (1280px), центриран. Minimum 10% side margins. |

**Допълнително:**
- Responsive images (`sizes` + Next/Image)
- Fluid typography с `clamp()`
- Touch targets минимум 44x44px
- Swipe gestures за галерия на мобилни
- Generous margins — минимум 10% на десктоп (дизайн принцип)

---

## 9. Файлова структура на проекта

```
/construction-site
├── /app
│   ├── layout.tsx              ← Root layout (glassmorphic navbar + footer)
│   ├── page.tsx                ← Лендинг пейдж
│   ├── /uslugi
│   │   └── page.tsx            ← Услуги
│   ├── /portfolio
│   │   ├── page.tsx            ← Портфолио (списък)
│   │   └── /[slug]
│   │       └── page.tsx        ← Отделен обект
│   └── /kontakti
│       └── page.tsx            ← Контакти
├── /components
│   ├── Navbar.tsx              ← Glassmorphic floating pill
│   ├── Footer.tsx              ← Primary (Midnight) фон
│   ├── Hero.tsx                ← Fullscreen + glassmorphic overlay
│   ├── ServiceCard.tsx         ← Rounded-xl, no borders
│   ├── ProjectCard.tsx         ← Image zoom, gold labels
│   ├── ProjectGallery.tsx      ← Asymmetric grid + lightbox
│   ├── Stats.tsx               ← Counter animation
│   ├── CTABanner.tsx           ← Midnight gradient + gold CTA
│   ├── SocialLinks.tsx         ← Pill icon buttons
│   └── AnimatedSection.tsx     ← Reusable scroll animation wrapper
├── /content
│   ├── services.json           ← Списък с услуги
│   └── /projects
│       ├── sunraiz.json
│       ├── biznes-park-yug.json
│       └── stariyat-grad.json
├── /public
│   └── /images
│       ├── hero.jpg
│       ├── cta-bg.jpg
│       └── /projects
│           ├── /sunraiz
│           │   ├── cover.jpg
│           │   ├── 01.jpg, 02.jpg, 03.jpg
│           ├── /biznes-park-yug
│           │   ├── cover.jpg
│           │   ├── 01.jpg, 02.jpg, 03.jpg
│           └── /stariyat-grad
│               ├── cover.jpg
│               ├── 01.jpg, 02.jpg, 03.jpg
├── /lib
│   ├── projects.ts             ← Helper за четене на project JSON файлове
│   └── services.ts             ← Helper за четене на services.json
├── /styles
│   └── globals.css             ← Tailwind base + custom utilities + design tokens
├── tailwind.config.ts          ← Custom colors, surfaces, fonts
├── next.config.js
└── package.json
```

---

## 10. "CMS" модел (без реален CMS)

**Добавяне на нов обект:**
1. Създай нов JSON файл в `/content/projects/nov-obekt.json`
2. Добави снимките в `/public/images/projects/nov-obekt/`
3. Deploy → обектът автоматично се появява

**Добавяне на нова услуга:**
1. Отвори `/content/services.json`
2. Добави нов обект в масива
3. Deploy → услугата автоматично се появява

---

## 11. Performance цели

- Lighthouse score: 90+ на всички категории
- First Contentful Paint: < 1.5s
- Всички изображения: WebP формат, lazy loaded
- Montserrat: preloaded, `font-display: swap`
- Static Generation (SSG) за всички страници
- Backdrop-blur елементите оптимизирани с `will-change: transform`

---

## 12. Do's and Don'ts (Строги правила)

### DO:
- Използвай **асиметрия** — снимки леко off-center или overlapping container edges
- **Generous margins** — минимум 10% side margins на десктоп
- Проверявай кирилицата — consistent x-heights в Montserrat
- Създавай дълбочина чрез **тонални преходи** между surface нивата
- Labels винаги UPPERCASE + letter-spacing +0.05em

### DON'T:
- **НИКОГА "boxy" layouts** — без 90-градусови ъгли на бутони и главни карти
- **НИКОГА чист черен (#000000)** — винаги Deep Midnight Blue
- **НИКОГА разделителни линии (1px borders)** — ако трябва граница → 48px whitespace или background color shift
- **НИКОГА традиционни box-shadow** за секциониране — ambient shadows само за floating елементи
- **НИКОГА "template" look** — всеки елемент трябва да изглежда "конструиран"

---

## 13. Тон и копирайтинг — "Elite Craftsmanship"

UI copy-то отразява **"Елитно Майсторство"**:

| Вместо (generic) | Използвай (elite) |
|---|---|
| "Нашите услуги" | "Майсторство и Прецизност" |
| "Контакти" | "Започнете Вашия Проект" |
| "Портфолио" | "Всеки Обект е История" |
| "За нас" | "Наследство и Визия" |

**Тон:**
- Директен и уверен, но с **елегантност**
- Фокус върху резултата — не какво правим, а какво получава клиентът
- Примерни фрази:
  - "Майсторство. Прецизност. Резултат."
  - "Качество, на което можете да стъпите"
  - "Всеки обект е история. Вижте нашите."
  - "Изграждаме бъдещето, камък по камък."

---

## 14. Бъдещи разширения (подготвени, не имплементирани)

- [ ] Филтриране на портфолио по тип
- [ ] Блог/Новини секция
- [ ] Многоезичност (EN)
- [ ] Форма за запитване с email notification
- [ ] Google Maps интеграция
- [ ] Testimonials/Отзиви секция
- [ ] Dark mode (Midnight като background, инвертирана hierarchy)

---

## 15. Tailwind Config — Design Tokens

```typescript
// tailwind.config.ts - Ключови custom стойности
{
  theme: {
    extend: {
      colors: {
        primary: '#0F172A',
        secondary: '#C5A059',
        surface: '#F8FAFC',
        'surface-container-lowest': '#FFFFFF',
        'surface-container-low': '#F1F5F9',
        'surface-container': '#E2E8F0',
        'surface-container-high': '#CBD5E1',
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      },
      borderRadius: {
        'pill': '9999px',
        '2xl': '2rem',
        '3xl': '3rem',
      },
      letterSpacing: {
        'tight-display': '-0.02em',
        'wide-label': '0.05em',
      },
      backdropBlur: {
        'glass': '20px',
      },
      boxShadow: {
        'ambient': '0 20px 60px rgba(15, 23, 42, 0.05)',
        'ambient-lg': '0 30px 80px rgba(15, 23, 42, 0.06)',
      }
    }
  }
}
```
