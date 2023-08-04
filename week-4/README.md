## ReactJS Elements 1

Event Nedir?
Event, HTML elementlerinde gerçekleşen olaylardır. Bir event tarayıcının yahut kullanıcının neden olduğu bir şey olabilir. Ve biz javascript yardımı ile bu event ‘leri (olayları) yakalayabiliriz.

React Event'in farkları

- HTML elementlerinde event isimleri lowercase iken (onclick) React ‘te camelCase ‘dir (onClick).
- HTML elementlerinde fonksiyon isimleri ilgili event ‘e “string” olarak atama yapılırken React ‘te direkt “fonksiyon” olarak atama yapılır. Buna bir örnek verelim :

```js
    //HTML
    <button onclick='send()'> Send Data </button>
    //ReactJs
    <button onClick={send}> Send Data </button>
```

- React ’teki diğer bir farklılık ise, event ‘lerdeki varsayılan davranışın false değeri döndürülerek engellenemiyor oluşudur. Bunun için preventDefault şeklinde açıkça yazarak tarayıcıya belirtmeniz gerekir.

```js
//HTML
<a href='#' onclick='alert(‘Linke tıklandı.’); return false'>
	Test
</a>;
//REACT
const Test = () => {
	function handleClick(e) {
		e.preventDefault();
		alert("Linke tıklandı.");
	}
	return (
		<a href='#' onClick={handleClick}>
			Test
		</a>
	);
};
```

- Bir fark daha … Yukarıda kullandığımız handleClick(e) fonksiyonunun aldığı “e” parametresi sentetik (yapay) bir event ‘tir.
  - React cross-browser uyumluluğunu sağlamak adına tarayıcının native event yapısına çok benzeyen, sentetik (yapay) bir event nesnesi ile sizin yazmış olduğunuz event ‘leri sarmalayarak bütün tarayıcılarda aynı çalışacak şekilde oluşturuyor.

React Hooks Nedir?

React Hooks, React’ın en kullanışlı özelliklerinden biridir. Hooks, hazırda yer alan state ve lifecycle gibi React özelliklerine erişmemizi sağlayan tekrar kullanılabilir javascript fonksiyonlarıdır. Kod karmaşıklığından bizi kurtarır. React fonksiyonlarının içinde kullanılır.

Başlıca React Hook’ları:

- useState
- useEffect
- useContext
- useReducer
- useCallback
- useMemo
- useRef
- useImperativeHandle
- useLayoutEffect
- useDebugValue
- useId

useState Nedir?

useState bir state hookudur. Herhangi değişkenleri saklayıp react bileşen fonksiyonlarında erişmeye, şartlı olarak kullanmaya, güncellemeyi sağlar.

```js
import { useState } from "react";

export default function App() {
	const [active, setActive] = useState(false);

	return (
		<div>
			{active ? "On" : "Off"}
			<button onClick={() => setActive(!active)}>Toggle</button>
		</div>
	);
}
```

useState(false) : Bileşeni globaldeki state yönetmemizi sağlayan utility bağlayan araç. useState react kütüphanesi içerisinden geliyor. **false** ise tutacağımız state default değeri…

**[active,setActive]**: Burada tutulan değeri erişimi örneğin age üzerinden okuma(read) yapıyoruz . Ve setActive üzerinden yazma(write) yapıyor

useEffect Nedir?

**useEffect** Hook’u ile component mount edildiğinde hangi fonksiyonun çalıştırılacağına karar verilir. Anonim fonksiyon ve dependency parametrelerini alır.
Yaşam döngüsü(lifecycle) methodlarının tersine UI'ı bloklamaz çünkü asenkron bir şekilde çalışır.

Component yaşam döngüsünde effects çalışma mantığı

![effects](https://blog.logrocket.com/wp-content/uploads/2020/11/common-react-lifecycle-methods-1.png)

Hooks yaşam döngüsünde effects çalışma mantığı

![effect-with-hooks](https://blog.logrocket.com/wp-content/uploads/2020/11/react-hooks-lifecycle-1.png)

```js
useEffect(
	() => {
		// Component mount

		return () => {
			// Component unmount
		};
	},
	// optional dependency array
	[]
);
```

Best Practices of useEffect

- Bağlantılı olmayan durumları takip etmek için
- ```js
  useEffect(
  	() => {
  		// Side effect 1
  	},
  	[
  		/* dependencies for effect 1 */
  	]
  );

  useEffect(
  	() => {
  		// Side effect 2
  	},
  	[
  		/* dependencies for effect 2 */
  	]
  );
  ```

- Yan etkileri temizleme
- ```js
  useEffect(() =>
  	const handleEvent = (event) => {
  	// Process the event
  };

  	window.addEventListener('customEvent', handleEvent);

  	return () => {
  		window.removeEventListener('customEvent', handleEvent);
  	};
  []);
  ```

useLayoutEffects

useLayoutEffect ekran paint işlemi olmadan DOM Mutationdan sonra ilgili bileşenlerin gerçek verilerini alıp bunlar üzerinde işlem yapmak için kullanılır.

```js
import { useEffect, useState } from "react";
// burada önce 'Görkem' sonra 'Görkem Eldeniz' ekrana basılır
export default function App() {
	const [name, setName] = useState("Görkem");

	useEffect(() => {
		setName("Görkem Eldeniz");
	}, []);

	return (
		<div>
			<h1>{name}</h1>
		</div>
	);
}

import { useLayoutEffect, useState } from "react";
// burada ise direkt 'Görkem Eldeniz' ekrana basılır
export default function App() {
	const [name, setName] = useState("Görkem");

	useLayoutEffect(() => {
		setName("Görkem Eldeniz");
	}, []);

	return (
		<div>
			<h1>{name}</h1>
		</div>
	);
}
```

Render Aşaması → React Updates DOM → useLayoutEffect → BrowserPaint Screen → useEffect

![useLayoutEffects](https://miro.medium.com/v2/resize:fit:720/format:webp/1*mO2jFHW9fHMoPLhiAHvsmw.png)

useImperativeHandle

Bu Hook fonksiyon bileşeninize dışarıdan imperative erişim için API sağlayarak , parent bileşenin bu bileşen içerisindeki API tüketebilmesine olanak sağlar.

![useImperativeHandle](https://miro.medium.com/v2/resize:fit:4800/format:webp/1*1LvNIwbYJvBsEF89JMU8JA.png)

useRef

Refler React için birer “escape hatch” olarak tanımlanır.
React sistemlerini kullanmadan bir işlem yapmak için tavsiye edilir.

Kullanım örneği

```js
// Butona basıldığında inputa focus olmasını sağlar
function focusOnInput() {
	const inputToFocus = useRef(null);
	const clickHandler = () => {
		inputToFocus.current.focus();
	};
	return (
		<>
			<input ref={inputToFocus} type='text' />
			<button onClick={clickHandler}>Focus on Input</button>
		</>
	);
}

//eski ve anlık değerleri yakalamak için kullanılabilir
export default function App() {
	const prevValue = useRef(0);
	const [ctr, setCtr] = useState(0);

	useEffect(() => {
		console.log("ctr:", ctr, "prevValue:", prevValue);
	}, [prevValue, ctr]);

	return (
		<div className='App'>
			<p>{ctr}</p>
			<button
				onClick={() => {
					setCtr((ctr) => {
						prevValue.current = ctr;
						return ctr + 1;
					});
				}}
			>
				Increase by 1
			</button>
		</div>
	);
}
```

useReducer

useReducer , geliştiricilere bileşenlerin state bir akış şeklinde yönetiliyorsa bu aşamada bir kolaylık sağlar useState yerine bu Hook’tan faydalanabilirsiniz. Örneğin aşağıdaki örnekte Ekranımızda bir counter değeri var. Buna etki eden UI Bileşenleri var. En basit yöntem bunu useState üzerinden kullanarak 1 arttırmak, 1 azaltmak veya 0 set etmek olarak düşünülebilir.

```js
import { useReducer } from "react";

function reducer(state, action) {
	switch (action.type) {
		case "increment":
			return state + 1;
		case "decrement":
			return state - 1;
		case "reset":
			return 0;
		default:
			break;
	}
}

export default function App() {
	const [state, dispatch] = useReducer(reducer, 0);

	return (
		<div className='App'>
			<h1>{state}</h1>
			<button onClick={() => dispatch({ type: "increment" })}>Arttır</button>
			<button onClick={() => dispatch({ type: "decrement" })}>Azalt</button>
			<button onClick={() => dispatch({ type: "reset" })}>Sıfırla</button>
		</div>
	);
}
```

useContext

Context kullanarak çalıştığınız componentler arasında veri taşıma işlemi gerçekleştirebilirsiniz diyebilirim. Context yapısında, context’in kendisine ait bir state vardır. Bu state provider componentinde tutulur. Eski yöntemle bahsedecek olursak bu state’e Context API içerisinde yer alan Consumer ile erişim sağlanır.

- Context : Bağlamdaki değerleri tutar..
- Provider: Bağlam içerisindeki değerleri sağlar.
- Consumer: Bağlam içerisindeki değerleri herhangi bir düğüm içerisinden erişilebilir hale getirir.

![useContext](https://miro.medium.com/v2/resize:fit:4800/format:webp/1*rZVVAYZkaps8s0vdqiBBJg.png)

![useContext](https://dmitripavlutin.com/90649ae4bdf379c482ad24e0dd220bc4/react-context-3.svg)

useTransition

Kullanıcı arabirimini engellemeden durumu güncellemenizi sağlayan bir React Hook’tur. useTransition,herhangi bir parametre almaz.

useTransition , iki öğe içeren bir dizi döndürür:

- isPending Bekleyen bir geçiş olup olmadığını size söyler.
- startTransition(),tarafından döndürülen işlev,durum güncellemesini bir geçiş olarak işaretlemenizi sağlar.
- React’teki eşzamanlı mod, acil görevleri acil olmayan görevlerden ayırmanıza olanak tanıyarak UI güncellemelerini daha kullanıcı dostu hale getirir.

```js
function TabContainer() {
	const [isPending, startTransition] = useTransition();
	const [tab, setTab] = useState("about");

	function selectTab(nextTab) {
		startTransition(() => {
			setTab(nextTab);
		});
	}
	// ...
}
```

useDeferredValue

Dom agacinin acil olmayan bir kisminin yeniden olusturulmasini ertelemenize olanak saglar.

```js
export default function App() {
	const [query, setQuery] = useState("");
	const deferredQuery = useDeferredValue(query);
	return (
		<>
			<label>
				Search albums:
				<input value={query} onChange={(e) => setQuery(e.target.value)} />
			</label>
			<Suspense fallback={<h2>Loading...</h2>}>
				<SearchResults query={deferredQuery} />
			</Suspense>
		</>
	);
}
```

useDeferredValue vs useTransition

useTransition() size tam kontrol sağlar çünkü hangi kodun sarılacağına ve "düşük öncelikli" olarak ele alınacağına siz karar verirsiniz. Ancak bazen, gerçek durum güncelleme koduna erişiminiz olmayabilir (örneğin, üçüncü taraf bir kütüphane tarafından gerçekleştirildiği için). Ya da bazı nedenlerden dolayı useTransition() işlevini kullanamazsınız.

Custom Hooks Nedir? Nasıl Kullanılır?

React, bileşenlerde aynı mantıktaki farklı gereksinimlerimize göre özelleştirmek istediğimiz Hook’umuzu yazmamız için kolaylık sağlar. React’ın custom Hook’umuzun hook olduğunu anlayabilmesi için fonksiyonu use ile başlayarak yazmalıyız. Örnek olarak useLocalStorage, useInput gibi. React, kendi Hook’larını custom hooks içinde kullanmamıza olanak tanır. İsteğimize bağlı olarak custom hooks parametre alabilir ve hangi değerleri döndürmek istediğimizi belirleyebiliriz. custom hook sayesinde yeniden kullanılabilir fonksiyonlar üretebilir, kod tekrarından kaçınabiliriz.

Custom Hook Örneği

```js
import { useState, useEffect } from "react";

const useCurrentLocation = () => {
	// store location in state
	const [location, setLocation] = useState();

	// Success handler for geolocation's `getCurrentPosition` method
	const handleSuccess = (position) => {
		const { latitude, longitude } = position.coords;

		setLocation({
			latitude,
			longitude,
		});
	};

	useEffect(() => {
		if (!navigator.geolocation) {
			return false;
		}
		// Call the Geolocation API
		navigator.geolocation.getCurrentPosition(handleSuccess);
	}, []);

	// Expose location result
	return { location };
};

export default useCurrentLocation;
```

Custom Hooks Best Practices

Basit tutulmalı:
Custom hooklar basit olmalı ve spesifik özellikler barındırmalı eğer yapı kompleksleşmeye başlarsa daha küçük hooklara parçalanabilir.

Test edilmeli:
Test ederek custom hookların dogru çalıştığından emin olunmalı.

React Hooks Kütüphaneleri

- React Hooks Form

  - Form state yönetimi ve validasyon işlemleri için kullanılır.Render sayısını ve gereksiz kod yazımını azaltarak optimizasyon sağlar.
  - ![react-hook-form](https://react-hook-form.com/images/dev-tool.png)

- usehooks

  - Custom hooklar şeklinde yazılmış spesifik işler yapmamızı sağlayan bir kütüphanedir.
  - UI kontrolleri, animasyonlar, side-effects vs

useMediaQuery

```ts
import { useEffect, useState } from "react";

export function useMediaQuery(query: string): boolean {
	const getMatches = (query: string): boolean => {
		// Prevents SSR issues
		if (typeof window !== "undefined") {
			return window.matchMedia(query).matches;
		}
		return false;
	};

	const [matches, setMatches] = useState<boolean>(getMatches(query));

	function handleChange() {
		setMatches(getMatches(query));
	}

	useEffect(() => {
		const matchMedia = window.matchMedia(query);

		// Triggered at the first client-side load and if query changes
		handleChange();

		// Listen matchMedia
		if (matchMedia.addListener) {
			matchMedia.addListener(handleChange);
		} else {
			matchMedia.addEventListener("change", handleChange);
		}

		return () => {
			if (matchMedia.removeListener) {
				matchMedia.removeListener(handleChange);
			} else {
				matchMedia.removeEventListener("change", handleChange);
			}
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [query]);

	return matches;
}
```

useFetch

```ts
import { useEffect, useReducer, useRef } from "react";

interface State<T> {
	data?: T;
	error?: Error;
}

type Cache<T> = { [url: string]: T };

// discriminated union type
type Action<T> =
	| { type: "loading" }
	| { type: "fetched"; payload: T }
	| { type: "error"; payload: Error };

export function useFetch<T = unknown>(
	url?: string,
	options?: RequestInit
): State<T> {
	const cache = useRef<Cache<T>>({});

	// Used to prevent state update if the component is unmounted
	const cancelRequest = useRef<boolean>(false);

	const initialState: State<T> = {
		error: undefined,
		data: undefined,
	};

	// Keep state logic separated
	const fetchReducer = (state: State<T>, action: Action<T>): State<T> => {
		switch (action.type) {
			case "loading":
				return { ...initialState };
			case "fetched":
				return { ...initialState, data: action.payload };
			case "error":
				return { ...initialState, error: action.payload };
			default:
				return state;
		}
	};

	const [state, dispatch] = useReducer(fetchReducer, initialState);

	useEffect(() => {
		// Do nothing if the url is not given
		if (!url) return;

		cancelRequest.current = false;

		const fetchData = async () => {
			dispatch({ type: "loading" });

			// If a cache exists for this url, return it
			if (cache.current[url]) {
				dispatch({ type: "fetched", payload: cache.current[url] });
				return;
			}

			try {
				const response = await fetch(url, options);
				if (!response.ok) {
					throw new Error(response.statusText);
				}

				const data = (await response.json()) as T;
				cache.current[url] = data;
				if (cancelRequest.current) return;

				dispatch({ type: "fetched", payload: data });
			} catch (error) {
				if (cancelRequest.current) return;

				dispatch({ type: "error", payload: error as Error });
			}
		};

		void fetchData();

		// Use the cleanup function for avoiding a possibly...
		// ...state update after the component was unmounted
		return () => {
			cancelRequest.current = true;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [url]);

	return state;
}
```

- React Query

  - React Query kütüphanesi sunucu ile istemci(client) arasında state yönetimi sırasında karşınıza çıkacak zorlukları geliştiriciden akıllıca soyutlayan data fetching kütüphanesidir. (Zorluklar \* fetching, caching, synchronizing, and updating server state)

  - Transport/protocol/backend agnostic data fetching (REST, GraphQL, promises, - whatever!)
  - Auto Caching + Refetching (stale-while-revalidate, Window Refocus, Polling/- Realtime)
  - Parallel + Dependent Queries
  - Mutations + Reactive Query Refetching
  - Multi-layer Cache + Automatic Garbage Collection
  - Paginated + Cursor-based Queries
  - Load-More + Infinite Scroll Queries w/ Scroll Recovery
  - Request Cancellation
  - React Suspense + Fetch-As-You-Render Query Prefetching

```js
import {
	useQuery,
	useMutation,
	useQueryClient,
	QueryClient,
	QueryClientProvider,
} from "react-query";
import { getTodos, postTodo } from "../my-api";

// Create a client
const queryClient = new QueryClient();

function App() {
	return (
		// Provide the client to your App
		<QueryClientProvider client={queryClient}>
			<Todos />
		</QueryClientProvider>
	);
}

function Todos() {
	// Access the client
	const queryClient = useQueryClient();

	// Queries
	const query = useQuery("todos", getTodos);

	// Mutations
	const mutation = useMutation(postTodo, {
		onSuccess: () => {
			// Invalidate and refetch
			queryClient.invalidateQueries("todos");
		},
	});

	return (
		<div>
			<ul>
				{query.data.map((todo) => (
					<li key={todo.id}>{todo.title}</li>
				))}
			</ul>

			<button
				onClick={() => {
					mutation.mutate({
						id: Date.now(),
						title: "Do Laundry",
					});
				}}
			>
				Add Todo
			</button>
		</div>
	);
}

render(<App />, document.getElementById("root"));
```

Helper Metotlar Nedir?

Program içerisinde bazı kod parçaları defalarca kullanılacaksa, bu satırları her seferinde tekrar yazmak yerine bir fonksiyon içerisine yazabilir ve fonksiyonun adı ile istedimiz yerden çağırabiliriz.

Bu metotlar sayesinde programlarımız hem daha düzenli ve temiz olacak, hem de gerektiğinde düzeltmeler yapmak daha kolay olacaktır.

Best Practices

- Komponentlerin dışında tanımlanmalı
- İşlevsel olmalı
- Eğer ki sadece bir komponenti ilgilendiriyorsa helper olmaktan çıkar.

Helper vs React Hooks

React hookları genel anlamda react'ın sağladığı metotları ve yaşam döngüleriyle etkileşimi sağlar helperlar ise daha çok bunların dışındaki tekrar eden mantıkları çözümlemede kullanılır.

```js
//Helper
export function formatDate(input: string | number | Date): string {
	const date = new Date(input);
	return date.toLocaleDateString("en-US", {
		month: "long",
		day: "numeric",
		year: "numeric",
	});
}
//Custom Hook
import { useState, useEffect } from "react";

export default function useDebounce(intialVal, delay) {
	const [text, setText] = useState(intialVal);
	const [debounceText, setDebounceText] = useState(intialVal);

	useEffect(() => {
		let id = setTimeout(() => {
			setDebounceText(search);
		}, delay);

		return () => clearTimeout(id);
	}, [text]);

	return [debounceText, setText];
}
```

## React App lerde SVG ve image nasıl kullanılır ?

SVG kullanmanın avantajları

- Esneklik ve çözünürlük
- Küçük dosya boyutları
- Yüksek performans ve hız
- DOM-like olduğundan stillendirebilir ve editlenebilir
- Animasyon yapılabilir
- Accessibility and SEO, DOM-like olduğu için browser tarafından indekslenebilir.

Kullanım yöntemleri

- Static SVG ler için <img> tag kullanımı
- ```js
  import React from "react";
  /*images*/
  import ReactLogo from "./logo.svg";

  const App = () => {
  	return (
  		<div className='App'>
  			<img src={ReactLogo} alt='React Logo' />
  		</div>
  	);
  };
  export default App;
  ```

- SVG Tag kullanımı
- ```js
  import React from "react";
  const App = () => {
  	return (
  		<div className='App'>
  			<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 841.9 595.3'>
  				<g fill='#61DAFB'>
  					<path d='M666.3 296.5c0-32.5-40.7-63.3-103.1-82.4 14.4-63.6 8-114.2-20.2-130.4-6.5-3.8-14.1-5.6-22.4-5.6v22.3c4.6 0 8.3.9 11.4 2.6 13.6 7.8 19.5 37.5 14.9 75.7-1.1 9.4-2.9 19.3-5.1 29.4-19.6-4.8-41-8.5-63.5-10.9-13.5-18.5-27.5-35.3-41.6-50 32.6-30.3 63.2-46.9 84-46.9V78c-27.5 0-63.5 19.6-99.9 53.6-36.4-33.8-72.4-53.2-99.9-53.2v22.3c20.7 0 51.4 16.5 84 46.6-14 14.7-28 31.4-41.3 49.9-22.6 2.4-44 6.1-63.6 11-2.3-10-4-19.7-5.2-29-4.7-38.2 1.1-67.9 14.6-75.8 3-1.8 6.9-2.6 11.5-2.6V78.5c-8.4 0-16 1.8-22.6 5.6-28.1 16.2-34.4 66.7-19.9 130.1-62.2 19.2-102.7 49.9-102.7 82.3 0 32.5 40.7 63.3 103.1 82.4-14.4 63.6-8 114.2 20.2 130.4 6.5 3.8 14.1 5.6 22.5 5.6 27.5 0 63.5-19.6 99.9-53.6 36.4 33.8 72.4 53.2 99.9 53.2 8.4 0 16-1.8 22.6-5.6 28.1-16.2 34.4-66.7 19.9-130.1 62-19.1 102.5-49.9 102.5-82.3zm-130.2-66.7c-3.7 12.9-8.3 26.2-13.5 39.5-4.1-8-8.4-16-13.1-24-4.6-8-9.5-15.8-14.4-23.4 14.2 2.1 27.9 4.7 41 7.9zm-45.8 106.5c-7.8 13.5-15.8 26.3-24.1 38.2-14.9 1.3-30 2-45.2 2-15.1 0-30.2-.7-45-1.9-8.3-11.9-16.4-24.6-24.2-38-7.6-13.1-14.5-26.4-20.8-39.8 6.2-13.4 13.2-26.8 20.7-39.9 7.8-13.5 15.8-26.3 24.1-38.2 14.9-1.3 30-2 45.2-2 15.1 0 30.2.7 45 1.9 8.3 11.9 16.4 24.6 24.2 38 7.6 13.1 14.5 26.4 20.8 39.8-6.3 13.4-13.2 26.8-20.7 39.9zm32.3-13c5.4 13.4 10 26.8 13.8 39.8-13.1 3.2-26.9 5.9-41.2 8 4.9-7.7 9.8-15.6 14.4-23.7 4.6-8 8.9-16.1 13-24.1zM421.2 430c-9.3-9.6-18.6-20.3-27.8-32 9 .4 18.2.7 27.5.7 9.4 0 18.7-.2 27.8-.7-9 11.7-18.3 22.4-27.5 32zm-74.4-58.9c-14.2-2.1-27.9-4.7-41-7.9 3.7-12.9 8.3-26.2 13.5-39.5 4.1 8 8.4 16 13.1 24 4.7 8 9.5 15.8 14.4 23.4zM420.7 163c9.3 9.6 18.6 20.3 27.8 32-9-.4-18.2-.7-27.5-.7-9.4 0-18.7.2-27.8.7 9-11.7 18.3-22.4 27.5-32zm-74 58.9c-4.9 7.7-9.8 15.6-14.4 23.7-4.6 8-8.9 16-13 24-5.4-13.4-10-26.8-13.8-39.8 13.1-3.1 26.9-5.8 41.2-7.9zm-90.5 125.2c-35.4-15.1-58.3-34.9-58.3-50.6 0-15.7 22.9-35.6 58.3-50.6 8.6-3.7 18-7 27.7-10.1 5.7 19.6 13.2 40 22.5 60.9-9.2 20.8-16.6 41.1-22.2 60.6-9.9-3.1-19.3-6.5-28-10.2zM310 490c-13.6-7.8-19.5-37.5-14.9-75.7 1.1-9.4 2.9-19.3 5.1-29.4 19.6 4.8 41 8.5 63.5 10.9 13.5 18.5 27.5 35.3 41.6 50-32.6 30.3-63.2 46.9-84 46.9-4.5-.1-8.3-1-11.3-2.7zm237.2-76.2c4.7 38.2-1.1 67.9-14.6 75.8-3 1.8-6.9 2.6-11.5 2.6-20.7 0-51.4-16.5-84-46.6 14-14.7 28-31.4 41.3-49.9 22.6-2.4 44-6.1 63.6-11 2.3 10.1 4.1 19.8 5.2 29.1zm38.5-66.7c-8.6 3.7-18 7-27.7 10.1-5.7-19.6-13.2-40-22.5-60.9 9.2-20.8 16.6-41.1 22.2-60.6 9.9 3.1 19.3 6.5 28.1 10.2 35.4 15.1 58.3 34.9 58.3 50.6-.1 15.7-23 35.6-58.4 50.6zM320.8 78.4z' />
  					<circle cx='420.9' cy='296.5' r='45.7' />
  					<path d='M520.5 78.1z' />
  				</g>
  			</svg>
  		</div>
  	);
  };
  export default App;
  ```
- SVG leri component olarak kullanım
- ```js
  import React from "react";
  import { SVGComponent as ReactLogo } from "./logo.svg";

  const App = () => {
  	return (
  		<div className='App'>
  			<ReactLogo />
  		</div>
  	);
  };
  export default App;

  //logo.svg file
  export default function SVGComponent(){
  	return (
  		<svg
  			width="100" height="100">
  			<circle cx="50" cy="50" r="40" stroke="green" stroke-width="4" fill="yellow" />
  		</svg>
  	)
  }
  ```

- SVGR paketini kullanarak SVG leri komponentlere dönüştürme(cra ve vitede konfigüre ederek)
- ```bash
  npm install @svgr/webpack --save-dev
  # with npm
  npm i vite-plugin-svgr
  ```
- ```js
  //vite.config.ts
  import { defineConfig } from "vite";
  import react from "@vitejs/plugin-react";
  import svgr from "vite-plugin-svgr";

  // https://vitejs.dev/config/
  export default defineConfig({
  	plugins: [svgr(), react()],
  });

  import React from "react";
  import ReactLogo from "./logo.svg";

  const App = () => {
  	return (
  		<div className='App'>
  			<ReactLogo />
  		</div>
  	);
  };
  export default App;
  ```

- DATA URL olarak kullanma (webpack ve vite de konfigüre edilerek kullanılır)
- ```bash
   npm install svg-url-loader --save-dev
  ```
- ```js
  import ReactLogo from "./logo.svg";

  const App = () => {
  	return (
  		<div className='App'>
  			<img src={ReactLogo} alt='React Logo' />
  		</div>
  	);
  };

  // domdaki görüntüsü
  <img src='data:image/svg+xml,%3csvg...' alt='React Logo' />;
  ```

- react-svg paketi kullanılarak
- SVG ler cacheleniyor birden çok SVG kullanımı tek istekle yapılıyor.
- ```bash
  npm install react-svg
  ```
- ```js
  import { ReactSVG } from "react-svg";
  <ReactSVG src='icon.svg' />;

  // içeriği

  <ReactSVG
  	afterInjection={(svg) => {
  		console.log(svg);
  	}}
  	beforeInjection={(svg) => {
  		svg.classList.add("svg-class-name");
  		svg.setAttribute("style", "width: 200px");
  	}}
  	className='wrapper-class-name'
  	desc='Description'
  	evalScripts='always'
  	fallback={() => <span>Error!</span>}
  	httpRequestWithCredentials={true}
  	loading={() => <span>Loading</span>}
  	onClick={() => {
  		console.log("wrapper onClick");
  	}}
  	onError={(error) => {
  		console.error(error);
  	}}
  	renumerateIRIElements={false}
  	src='svg.svg'
  	title='Title'
  	useRequestCache={false}
  	wrapper='span'
  />;
  ```

```

```
