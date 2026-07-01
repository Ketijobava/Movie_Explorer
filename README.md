# Movie Explorer - React Web Application

Movie Explorer არის React-ზე შექმნილი ვებაპლიკაცია, რომელიც მომხმარებელს საშუალებას აძლევს მოძებნოს ფილმები, ნახოს მათზე დეტალური ინფორმაცია, დაამატოს ფავორიტებში ან Watchlist-ში და უყუროს ოფიციალურ ტრეილერებს. პროექტი მუშაობს TMDB API-ის გამოყენებით.

## ფუნქციონალი

- ფილმების ძიება TMDB API-ის გამოყენებით
- ფილმის დეტალური ინფორმაციის ნახვა
- ოფიციალური ტრეილერის გახსნა მოდალურ ფანჯარაში
- Favorites და Watchlist ფუნქციები (ინახება LocalStorage-ში)
- Dark და Light რეჟიმები (ინახება LocalStorage-ში)
- ორენოვანი ინტერფეისი (ქართული / English)
- სრულად რესპონსიული დიზაინი (Mobile, Tablet და Desktop)
- ანიმაციები Framer Motion-ის გამოყენებით

## გამოყენებული ტექნოლოგიები

- React
- React Router DOM
- Axios
- SCSS (Sass)
- Framer Motion
- React Icons
- React Hot Toast

## პროექტის გაშვება

1. დააინსტალირეთ საჭირო პაკეტები:

```bash
npm install
```

2. გაუშვით პროექტი:

```bash
npm run dev
```

## პროექტის სტრუქტურა

```text
src/
├── api/           # TMDB API კონფიგურაცია
├── components/    # UI კომპონენტები
├── context/       # Theme, Language, Favorites და Watchlist
├── pages/         # გვერდები
├── styles/        # SCSS ფაილები
└── utils/         # დამხმარე ფუნქციები და თარგმანები
```

## დამატებითი ინფორმაცია

პროექტში გამოყენებულია TMDB API ფილმების მონაცემების მისაღებად.

Powered by TMDB API:
https://www.themoviedb.org/