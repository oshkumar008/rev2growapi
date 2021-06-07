import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../pgquery/products.js';
const exp = express();
    
export const productList = async (req,res,next) => {
    pool.query(('SELECT * FROM users ORDER BY id ASC'), (error, results) => {
        if (error) {
          throw error
        }
        res.status(200).json(results.rows)
      });
}

export const viewProduct = async (req,res,next) => {
    let id = req.params.id;
    pool.query('SELECT * FROM users WHERE id = $1',[id], (error, results) => {
        if (error) {
          throw error
        }
        res.status(200).json(results.rows)
      });

}

export default {productList,viewProduct}; 
