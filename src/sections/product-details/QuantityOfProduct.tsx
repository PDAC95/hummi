import React, { useState } from 'react';

const QuantityOfProduct: React.FC = () => {
    const [prodValue, setProdValue] = useState(1)

    return (
        <div className="quantity-box">
            <button onClick={() => setProdValue((pre) => pre > 1 ? pre - 1 : pre)} type="button" className="sub ">
                <i className="fa fa-minus"></i>
            </button>
            <input type="number" id="product-1" value={prodValue} onChange={(e) => setProdValue(parseInt(e.target.value) || 1)} />
            <button onClick={() => setProdValue((pre) => pre + 1)} type="button" className="add">
                <i className="fa fa-plus"></i>
            </button>
        </div>
    );
};

export default QuantityOfProduct;