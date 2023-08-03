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

useLayoutEffect ekran paint işlemi olmadan DOM Mutation göre sonra ilgili bileşenlerin ölçüleri gerçek bilgileri alıp bunlar üzerinde işlem yapmak için kullanılır.

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
