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
	{" "}
	Test{" "}
</a>;
//REACT
const Test = () => {
	function handleClick(e) {
		e.preventDefault();
		alert("Linke tıklandı.");
	}
	return (
		<a href='#' onClick={handleClick}>
			{" "}
			Test{" "}
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

This means that the code inside useLayoutEffect will run before the browser paints
which is important for layout changes like measuring elements or animating them.

useLayoutEffect senkron bir şekilde React'in DOM üzerindeki manipülasyonlarından sonra çalışır yani browser paint edilmeden önce çalışıyor bu sayede layout değişiklikleri element ölçümleri ve animasyonlar yapılabiliniyor.
En iyi kullanım yolu layout değişiklerin hemen uygulanmasıdır

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

![useContext](https://dmitripavlutin.com/90649ae4bdf379c482ad24e0dd220bc4/react-context-3.svg)

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

- usehooks

  - Custom hooklar şeklinde yazılmış spesifik işler yapmamızı sağlayan bir kütüphanedir.
  - UI kontrolleri, animasyonlar, side-effects vs

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
