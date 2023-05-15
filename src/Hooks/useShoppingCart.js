import { useCallback, useEffect, useState } from 'react'

const useShoppingCart = () => {

    // Label for localstorage
    const storageLabel = "shoppingcart";

    const Cart = JSON.parse(localStorage.getItem(storageLabel)) || [];

    const [shoppingCart, setShoppingCart] = useState(Cart)

    const findProduct = useCallback((id) => {

        // find() finder den første, og så går den ikke videre
        const itemObj = shoppingCart.find((item) => item.id === id)

        return itemObj;

    }, [shoppingCart])

    const increaseCartQuantity = useCallback((id, price, item, amount) => {

        // Hvis den returnere undefinder så skal shoppingcart returnere ...
        if (findProduct(id) === undefined) {
            setShoppingCart(prev => [...prev, { id, price, item, amount }])
        } else {
            setShoppingCart(prev => prev.map((item) => {
                if (item.id === id) {
                    return {
                        ...item, amount: item.amount + 1
                    }
                } else {
                    return { ...item };
                }
            }))
        }

    }, [findProduct]);

    // Delete item by id
    const deleteItem = useCallback((id) => {
        console.log('Deleting item:', id);
        setShoppingCart((prev) => prev.filter((item) => item.id !== id));
      }, []);


    // Delete all items
      
    // decreaseCartQuantity



    const returnAmount = useCallback((id) => {
        const itemAmount = findProduct(id)?.amount;
        return itemAmount;
      }, [findProduct]);


    //Update shoppingCart
    useEffect(() => {
        localStorage.setItem(storageLabel, JSON.stringify(shoppingCart))
    }, [shoppingCart]);

    // shoppingcart er blå fordi det er en værdi, og den gule farve er en funktion
    return { increaseCartQuantity, returnAmount, deleteItem, shoppingCart };

}

export default useShoppingCart