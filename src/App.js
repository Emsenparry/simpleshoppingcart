import ProductCard from "./Components/Cards/ProductCard";
import { GridSection } from "./Components/Sections/GridSection";
import ShoppingCart from "./Components/ShoppingCart";
import { useFetch } from "./Hooks/useFetch";
import useShoppingCart from "./Hooks/useShoppingCart";

function App() {

  const { increaseCartQuantity, returnAmount} = useShoppingCart();

  const url = "https://dummyjson.com/products?limit=8";

  const { apiData, loading, error } = useFetch(url, "products");

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div> Error: {error.message}</div>;
  }

  return (
    <>
      <GridSection size="300px">
        {apiData.map((item, i) => (
          <ProductCard key={i} item={item} {...{increaseCartQuantity, returnAmount}} />
        ))}
      </GridSection>
      <ShoppingCart />
    </>
  );
}

export default App;
