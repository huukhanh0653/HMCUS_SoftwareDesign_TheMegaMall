const User = require('../models/user.model')
const Product = require('../models/product.model');

exports.sortObject = (obj) => {
    let sorted = {};
    let str = [];
    let key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            str.push(encodeURIComponent(key));
        }
    }
    str.sort();
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
    }
    return sorted;
}

exports.isDayEqual = (date1, date2) => {
    if (!(date1 instanceof Date) || !(date2 instanceof Date)) {
        return false; // Hoặc thực hiện xử lý khác tùy thuộc vào yêu cầu của bạn
    }

    const day1 = date1.getUTCDate();
    const month1 = date1.getUTCMonth();
    const year1 = date1.getUTCFullYear();

    const day2 = date2.getUTCDate();
    const month2 = date2.getUTCMonth();
    const year2 = date2.getUTCFullYear();

    return day1 === day2 && month1 === month2 && year1 === year2;
}


exports.getDate = (startDay, endDay) => {
    const result = [];
    let currentDay = new Date(startDay);

    while (currentDay <= endDay) {
        result.push(new Date(currentDay));
        currentDay.setDate(currentDay.getDate() + 1);
    }

    return result;
}

exports.getWeeksInMonth = (year, month) => {
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    const firstDayOfWeek = firstDayOfMonth.getUTCDay();

    const daysInMonth = lastDayOfMonth.getUTCDate();
    const weeks = Math.ceil((daysInMonth + firstDayOfWeek) / 7);

    return weeks;
}

exports.getStartOfWeek = (year, month, week) => {
    const firstDayOfMonth = new Date(Date.UTC(year, month, 1));
    const daysUntilFirstSunday = (7 - firstDayOfMonth.getUTCDay()) % 7;

    const startOfWeek = new Date(firstDayOfMonth);
    startOfWeek.setUTCDate(firstDayOfMonth.getUTCDate() + daysUntilFirstSunday + (week - 1) * 7);

    return startOfWeek;
}

exports.getMonth = (year, monthIndex) => {
    const firstDay = new Date(year, monthIndex, 1);
    const lastDay = new Date(year, monthIndex + 1, 0);

    return {
        start: firstDay,
        end: lastDay
    };
}

exports.getFilterFromQuery = (filterString) => {
    if (!filterString) return [];
    const [minPrice, maxPrice] = filterString.split(',');
    return [minPrice, maxPrice];
}

exports.applyFilter = (product, priceFilters) => {
    let check = true;
    if (priceFilters.length > 0) {
        check = product.price >= priceFilters[0] && product.price <= priceFilters[1];
    }
    return product.category != null && check;
}

exports.paginationHandler = (page, limit, data) => {
    const skip = (page - 1) * limit;

    const paginatedResults = data.slice(skip, skip + limit * 1.0);

    const totalPages = Math.ceil(data.length / limit);

    return {
        totalPages: totalPages,
        paginatedResults: paginatedResults
    }
}

exports.getUser = async (userId) => {
    const user = await User.findById(userId)
    if (!user) {
        return res.status(404).json({
            status: "fail",
            data: "Cannot find this user"
        });
    }
    return user;
}

exports.getProduct = async (product_id) => {
    const product = await Product.findById(product_id)
        if (!product) {
            return res.status(200).json({
                status: "fail",
                data: "Product does not exist"
            });
        }
}

exports.checkExistProduct = async (user, product_id) => {
    const existingProduct = user.Cart.find(item => item.product_id == product_id);
    return existingProduct;
}

exports.countTotalPriceAndCartData = async (user) => {
    const cartData = []
    const totalPrice = await user.Cart.reduce(async (totalPromise, cartItem) => {
        const total = await totalPromise;

        try {
            const product = await Product.findById(cartItem.product_id).populate({
                path: 'category',
                select: 'name'
            });
            const quantity = cartItem.quantity;
            cartData.push({ product, quantity });
            if (product) {
                return product ? total + cartItem.quantity * product.price : total;
            }
        } catch (error) {
            return total;
        }
    }, Promise.resolve(0));
    return { cartData, totalPrice };
}

exports.updateCartQuantity = (user, product, quantity) => {
    const existingProduct = user.Cart.find(item => item.product_id == product._id);

    if (existingProduct) {
        existingProduct.quantity += quantity;
    } else {
        user.Cart.push({ product_id: product._id, quantity });
    }
}

exports.handleError = (err, res) => {
    console.error(err);
    res.status(500).json({
        status: "fail",
        data: err.message,
    });
}