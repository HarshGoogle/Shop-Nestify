import React from 'react'
import { useState, useEffect, useRef } from 'react';
import './SearchBar.css'
import Products from './Products';

export default function SearchBar(props) {
    const [searchKeyword, setSearchKeyword] = useState('');
    const [relatedKeywords, setRelatedKeywords] = useState([]);
    const [products, setProducts] = useState(false);
    const [filterBtn, setFilterBtn] = useState(false);
    const [filter, setFilter] = useState(false);
    const searchBarRef = useRef(null);
    const filterBtnRef = useRef(null); // Create a reference to the filter button
    const [categories, setCategories] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [brands, setBrands] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedPriceRange, setSelectedPriceRange] = useState('');
    const [message, setMessage] = useState(false);
   
    const handleInputChange = (e) => {
        const keyword = e.target.value;
        setSearchKeyword(keyword);
        // Example: Fetch related keywords from an API endpoint
        fetchRelatedKeywords(keyword)
            .then((keywords) => {
                setRelatedKeywords(keywords);
            })
            .catch((error) => {
                console.error('Error fetching related keywords:', error);
            });
    };

    const fetchRelatedKeywords = async (keyword) => {
        if (keyword === '') {
            return [];
        }
        try {
            const response = await fetch(`http://localhost:5000/apis/keyword?keyword=${keyword}`);
            if (!response.ok) {
                throw new Error('Failed to fetch related keywords');
            }
            const data = await response.json();
            return data.productNames;
        } catch (error) {
            console.error('Error fetching related keywords:', error);
            return [];
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let url = `http://localhost:5000/apis/keyword?action=completeproductdetail`;

            if (filter) {
                if (selectedCategory !== '') {
                    url += `&category=${encodeURIComponent(selectedCategory)}`;
                }
                if (selectedBrand !== '') {
                    url += `&brand=${encodeURIComponent(selectedBrand)}`;
                }
                if (selectedPriceRange !== '') {
                    const minPrice = getMinPrice(selectedPriceRange);
                    const maxPrice = getMaxPrice(selectedPriceRange);
                    url += `&minPrice=${minPrice}&maxPrice=${maxPrice}`;
                }
            } else {
                url += `&keyword=${encodeURIComponent(searchKeyword)}`;
            }
            console.log(url);
            const response = await fetch(url);
            if (response.status === 404) {
                const data = await response.json();
                setMessage(data.message);
                setTimeout(() => {
                    setMessage(false);
                }, 2000);
                setProducts([]); // Clear the products state
                setRelatedKeywords([]);
            } else if (!response.ok) {
                throw new Error('Failed to fetch products');
            } else {
                const data = await response.json();
                setProducts(data);
                setRelatedKeywords([]);
            }
            setFilter(false);
            setSelectedCategory('');
            setSelectedBrand('');
            setSelectedPriceRange('');
        } catch (error) {
            console.error('Error fetching related keywords:', error);
            return [];
        }
    };
    const handleClick = async (keyword) => {
        setSearchKeyword(keyword);
        try {
            const response = await fetch(`http://localhost:5000/apis/keyword?keyword=${keyword}&&action=completeproductdetail`);
            if (!response.ok) {
                throw new Error('Failed to fetch related keywords');
            }
            const data = await response.json();
            setProducts(data);
            setRelatedKeywords([]);
        } catch (error) {
            console.error('Error fetching related keywords:', error);
            return [];
        }
    };
    const handleSearchBarFocus = () => {
        setFilterBtn(true); // Show the filter button when the search bar is focused
        props.Reserve(props.navlink("get"));
        props.navlink("Search");
    };

    useEffect(() => {
    }, [filter, filterBtn])

    const filterData = async () => {
        try {
            const response = await fetch(`http://localhost:5000/apis/filter?action=fetchCategories`);
            const categoriesData = await response.json();
            setCategories(categoriesData);
        } catch (error) {

        }
    }
    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };
    const handleBrandChange = (event) => {
        setSelectedBrand(event.target.value);
    };
    useEffect(() => {
        async function fetchBrands() {
            if (selectedCategory) {
                try {
                    const response = await fetch(`http://localhost:5000/apis/filter?action=fetchBrand&&category=${encodeURIComponent(selectedCategory)}`);
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const brandsData = await response.json();
                    setBrands(brandsData);
                } catch (error) {
                    console.error('Failed to fetch brands:', error);
                }
            }
        }

        fetchBrands();
    }, [selectedCategory]);

    const handlePriceChange = (event) => {
        setSelectedPriceRange(event.target.value);
    };

    const getMinPrice = (priceRange) => {
        switch (priceRange) {
            case "0-1000":
                return 0;
            case "1000-2000":
                return 1000;
            case "2000-3000":
                return 2000;
            case "3000-more":
                return 3000;
            default:
                return 0;
        }
    };

    const getMaxPrice = (priceRange) => {
        switch (priceRange) {
            case "0-1000":
                return 1000;
            case "1000-2000":
                return 2000;
            case "2000-3000":
                return 3000;
            case "3000-more":
                return Number.POSITIVE_INFINITY;
            default:
                return Number.POSITIVE_INFINITY;
        }
    };
    return (
        <>
            <div className='parent'>
                <form className='serach-form d-flex w-100 mb-3 mb-lg-0' onSubmit={handleSubmit}>

                    <div className="container">
                    {filterBtn && <button type='button' className='filterBtn' ref={filterBtnRef} onClick={() => { filterData(); filter ? setFilter(false) : setFilter(true) }} >Filter</button>}
                        <input type="text"  name='searchbar'
                        className="input searchbar" placeholder="Search anything..."  value={searchKeyword}
                        onChange={handleInputChange}
                        onFocus={handleSearchBarFocus}
                        ref={searchBarRef} />
                            <button className="search__btn">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22">
                                    <path d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z" fill="#efeff1"></path>
                                </svg>
                            </button>
                    </div>
                </form>
            </div>
            {filter && <>
                <div className='filter-container'>
                    <select value={selectedCategory} onChange={handleCategoryChange} className='filter'>
                        <option value="">Select a category</option>
                        {categories && categories.map(category => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>
                    <select value={selectedBrand} onChange={handleBrandChange} className='filter'>
                        <option value="">Select a brand</option>
                        {brands && brands.map(brand => (
                            <option key={brand} value={brand}>{brand}</option>
                        ))}
                    </select>
                    <select value={selectedPriceRange} onChange={handlePriceChange} className='filter'>
                        <option value="">Price</option>
                        <option value="0-1000">less than 1000</option>
                        <option value="1000-2000">1000-2000</option>
                        <option value="2000-3000">2000-3000</option>
                        <option value="3000-more">more than 3000</option>
                    </select>
                </div>
            </>}
            <div className="keywords-container d-flex flex-wrap">
                {relatedKeywords && relatedKeywords.map((keyword, index) => (
                    <div className="keyword" key={index} onClick={() => handleClick(keyword)}>{keyword}</div>
                ))}
            </div>
            {products && <Products setPerson={props.setPerson} navlink={props.navlink} message={message} keyword={searchKeyword}  username={props.username} loggedIn={props.loggedIn} products={products} Reserve={props.Reserve} />}
        </>
    )
}
