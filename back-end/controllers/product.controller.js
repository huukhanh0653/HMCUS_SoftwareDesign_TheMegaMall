const Product = require('../models/product.model')
const User = require('../models/user.model')
const cloudinary = require('../config/cloudinaryConfig')
const fs = require('fs');
const Category = require('../models/category.model')
const { getFilterFromQuery, applyFilter, paginationHandler } = require('../helper/index');

exports.getAllProduct = async (req, res) => {
    try {
      // Extract query parameters
      const query = req.query;
      const filterArray = getFilterFromQuery(query.filter); // Use helper function
  
      // Build query builder with filtering and sorting
      let queryBuilder = Product.find()
        .populate({
          path: 'category',
          select: 'name isHidden',
          match: { isHidden: false }
        });
  
      if (query.sort) {
        const sortBy = query.sort.split(',').join(' ');
        queryBuilder = queryBuilder.sort(sortBy);
      }
  
      // Execute the query and handle results
      const result = await queryBuilder.exec();
      const filteredData = result.filter(product => applyFilter(product, filterArray)); // Use helper function
      
      // Calculate pagination skip value
      const paginationResult = paginationHandler(query.page, query.limit, filteredData); // Use helper function
  
      res.status(200).json({
        status: "success",
        totalPage: paginationResult.totalPages,
        data: paginationResult.paginatedResults
      });
    } catch (err) {
      // Provide more specific error message
      res.status(400).json({
        status: 'fail',
        msg: err.message || 'An error occurred while fetching products'
      });
    }
  };

exports.getProduct = async (req, res) => {
    try {
        const id = req.params.id;
        let product = await Product.findById(id)
            .populate({
                path: 'category',
                select: 'name'
            })

        res.status(200).json({
            status: "success",
            data: product
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            msg: err
        })
    }
}

exports.createProduct = async (req, res) => {
    try {
        const {
            title,
            detail,
            category,
            price
        } = req.body;

        const file = req.files.image;
        const result = await cloudinary.uploader.upload(file.tempFilePath, {
            public_id: `${Date.now()}`,
            resource_type: "auto",
            folder: "images"
        })
        const foundCategory = await Category.findOne({ name: category })
        const product = {
            title: title,
            detail: detail,
            category: foundCategory._id,
            posted_time: new Date(),
            price: price,
            image: result.url
        }
        const newProduct = await Product.create(product);
        res.status(201).json({
            status: 'success',
            data: {
                Product: newProduct
            }
        })
    } catch (err) {
        res.status(400).json({
            status: "fail",
            msg: err
        })
    }
}

exports.createAllProduct = async (req, res) => {
    try {
        const filePath = `${__dirname}data\\data.json`.replace('controllers', '');
        const Products = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

        console.log(Products)

        for (const pr of Products) {
            await Product.create(pr);
        }
        res.status(201).json({
            status: 'success'
        })
    } catch (err) {
        res.status(400).json({
            status: "fail",
            msg: err
        })
    }

}

exports.updateProduct = async (req, res) => {
    console.log(req.isAuthenticated())
    console.log(req.isAuthenticated())
    try {
        const id = req.params.id;
        const newProduct = req.body
        if (newProduct.category) {
            const foundCategory = await Category.findOne({ name: newProduct.category })
            newProduct.category = foundCategory._id;
        }
        if (req.files) {
            const file = req.files.image;
            const result = await cloudinary.uploader.upload(file.tempFilePath, {
                public_id: `${Date.now()}`,
                resource_type: "auto",
                folder: "images"
            })
            newProduct.image = result.url
        }

        const update = await Product.findByIdAndUpdate(id, newProduct, {
            new: true
        })
        res.status(201).json({
            status: 'success',
            data: newProduct
        })
    } catch (err) {
        res.status(500).send({
            status: "error",
            msg: err
        })
    };
}

exports.deleteProduct = async (req, res) => {
    try {

        const _id = req.params.id;
        await Product.deleteOne({
            _id
        });

        res.status(201).json({
            status: 'success',
        })
    } catch (err) {
        res.status(400).json({
            status: "fail",
            msg: err
        })
    }
}