import { useCallback, useEffect, useState } from 'react'

const useShoppingCart = () => {

    // Label for localstorage
    const storageLabel = "shoppingcart";

    // Definere indkøbskurv ud fra localstorage eller brug tomt array, hvis indkøbskurv ikke findes i localstorage.
    const Cart = JSON.parse(localStorage.getItem(storageLabel)) || [];

    // Værdi til at holde shoppingkurv i state, initial state er værdien af localStorage.
    const [shoppingCart, setShoppingCart] = useState(Cart)

    // Find et specifikt produkt i indkøbskurven ud fra dets id.
    const findProduct = useCallback((id) => {

        // find() finder den første, og så går den ikke videre
        const itemObj = shoppingCart.find((item) => item.id === id)

        return itemObj;

    }, [shoppingCart])

    // Forøg antal eller tilføj produt til kurven, hvis det ikke findes
    const increaseCartQuantity = useCallback((id, price, item, amount) => {

        if (findProduct(id) === undefined) {
            // Hvis produktet ikke findes i indkøbskurven, tilføjes det
            setShoppingCart(prev => [...prev, { id, price, item, amount }])
        } else {
            // Hvis produktet allerede findes i indkøbskurven, øges mængden med 1
            setShoppingCart(prev => prev.map((item) => {
                if (item.id === id) {
                    // Hvis produktets ID allerede eksistere i indkøbskurven, så øges mængden af det pågældene produkt med 1.
                    return {
                        // Opdatere værdien af 'amount'
                        ...item, amount: item.amount + 1
                    }
                } else {
                    // Bruger spread-operatoren (...) til at oprette en nu objekt-literal, der kopiere alle nøglerne og værdierne fra det orginale 'item'
                    return { ...item };
                }
            }))
        }

    }, [findProduct]);

    // Delete item by id
    const deleteProduct = (id) => {
        setShoppingCart(prev => prev.filter((item) => item.id !== id));
    }

    // Delete all items
    const emptyCart = () => {
        setShoppingCart([])
    };

    // DecreaseCartQuantity
    const decreaseCartQuantity = useCallback((id) => {
        if(findProduct(id)?.amount === 1) {
            setShoppingCart(prev => prev.filter((item) => item.id !== id));
        } else {
            setShoppingCart(prev => prev.map((item) => {
                if(item.id === id) {
                    return {
                        ...item,
                        amount: item.amount - 1
                    };
                } else {
                    return {...item};
                }
            }))
        }
    }, [findProduct])

    // ReturnAmount skriver hvor mange produkter vi har
    const returnAmount = useCallback((id) => {
        const itemAmount = findProduct(id)?.amount;
        return itemAmount;
    }, [findProduct]);


    //Update shoppingCart
    useEffect(() => {
        localStorage.setItem(storageLabel, JSON.stringify(shoppingCart))
    }, [shoppingCart]);

    // shoppingcart er blå fordi det er en værdi, og den gule farve er en funktion
    return { increaseCartQuantity, returnAmount, deleteProduct, emptyCart, decreaseCartQuantity, shoppingCart };

}

export default useShoppingCart