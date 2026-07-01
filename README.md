# Movie Explorer - React Web Application

Movie Explorer არის React-ზე შექმნილი ვებაპლიკაცია TMDB API-ით. მომხმარებელს საშუალებას აძლევს მოძებნოს ფილმები, ნახოს დეტალები, დაამატოს ფავორიტებში/Watchlist-ში და უყუროს ტრეილერებს.

## მოთხოვნების შესრულება

| მოთხოვნა | სტატუსი |
|----------|---------|
| ფუნქციური კომპონენტები | ✅ |
| React Hooks (useState, useEffect, useContext, useCallback...) | ✅ |
| React Router (ნავიგაცია) | ✅ |
| Axios + TMDB API | ✅ |
| LocalStorage / SessionStorage | ✅ |
| რესპონსიული დიზაინი | ✅ |
| ანიმაციები + მოდალური ფანჯარა | ✅ |
| SCSS (ბონუს) | ✅ |
| Dark / Light თემა (ბონუს) | ✅ |
| ორენოვანი (KA/EN) (ბონუს) | ✅ |

## ფუნქციონალი

- მთავარი გვერდი: Trending, Popular, Top Rated, Now Playing, Upcoming
- Live Search + ჟანრის ფილტრი
- ფილმის დეტალები, cast, similar movies
- YouTube ტრეილერის მოდალი (Framer Motion)
- Favorites & Watchlist (LocalStorage)
- ენა და თემა (LocalStorage)
- ბოლო ძებნა (SessionStorage)

## ტექნოლოგიები

- React 19 + Vite
- React Router DOM
- Axios
- SCSS (Sass)
- Framer Motion
- React Icons
- React Hot Toast

## გაშვება

1. დააინსტალირეთ პაკეტები:
```bash
npm install
```

2. შექმენით `.env` ფაილი:
```bash
cp .env.example .env
```

3. TMDB API Key: [themoviedb.org/settings/api](https://www.themoviedb.org/settings/api)
```
VITE_TMDB_API_KEY=your_key_here
```

4. გაუშვით:
```bash
npm run dev
```

## სტრუქტურა

```text
src/
├── api/              # Axios + TMDB კონფიგურაცია
├── components/       # Navbar, Hero, MovieCard, Modal, Loader...
├── context/          # Theme, Language, Global (Favorites/Watchlist)
├── hooks/            # useDebounce, useMediaQuery
├── pages/            # Home, Search, MovieDetails, Favorites...
├── styles/           # SCSS variables, mixins, globals
└── utils/            # translations, helpers
```

Powered by [TMDB API](https://www.themoviedb.org/)
