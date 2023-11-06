/** @format */

import { createContext, useState } from "react";
import { toast } from "react-toastify";
import {
  getCategories,
  getSubCategories,
  addSubCategory,
  addCategory,
  getAllSubCategories,
  editCategory,
  editSubCategory,
  deleteCategory,
  deleteSubCategory,
  editCategoryStatus,
  editSubCategoryStatus,
} from "../apis/category";

export const CategoryContext = createContext();

const CategoryProvider = (props) => {
  const [categories, setCategories] = useState([]);
  const [subcategory, setSubcategory] = useState(null);
  const [category, setCategory] = useState(null);
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load categories
  const getAllCategories = async (token) => {
    setLoading(true);
    try {
      getCategories(token).then((res) => {
        setCategories(res?.data?.response);
        setLoading(false);
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(
        error?.response?.data?.message || "Error in fetching categories"
      );
    }
  };

  // create Category
  const createCategory = (form, token) => {
    addCategory(token, form)
      .then((res) => {
        toast.success(res?.data?.message);
        setCategory(null);
        getAllCategories(token);
      })
      .catch((error) => {
        console.log(error);
        toast.error(
          error?.response?.data?.message || "Error in creating category"
        );
      });
  };
  // update category
  const updateCategory = async (form, token) => {
    editCategory(token, form)
      .then((res) => {
        toast.success(res?.data?.message);
        setCategory({});
        getAllCategories(token);
      })
      .catch((error) => {
        console.log(error);
        toast.error(
          error?.response?.data?.message || "Error in updating category"
        );
      });
  };

  const updateCategoryStatus = async (form, token) => {
    editCategoryStatus(token, form)
      .then((res) => {
        toast.success(res?.data?.message);
        getAllCategories(token);
      })
      .catch((error) => {
        console.log(error);
        toast.error(
          error?.response?.data?.message || "Error in updating status"
        );
      });
  };

  const updateSubCategoryStatus = async (form, token) => {
    editSubCategoryStatus(token, form)
      .then((res) => {
        toast.success(res?.data?.message);
        allSubcategores(token);
      })
      .catch((error) => {
        console.log(error);
        toast.error(
          error?.response?.data?.message || "Error in updating status"
        );
      });
  };
  // delete category
  const removeCategory = async (id, token) => {
    deleteCategory(id, token)
      .then((res) => {
        toast.success(res?.data?.message);
        const updatedCategories = categories.filter(
          (category) => category._id !== id
        );
        setCategories(updatedCategories);
      })
      .catch((error) => {
        console.log(error);
        toast.error(
          error?.response?.data?.message || "Error in deleting category"
        );
      });
  };

  // get subcategories
  const allSubcategores = (token) => {
    setLoading(true);
    getAllSubCategories(token)
      .then((res) => {
        setSubcategories(res.data.response);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        toast.error(
          error?.response?.data?.message || "Error in fetching subcategories"
        );
      });
  };
  // create subcategories
  const createSubcategory = (form, token) => {
    addSubCategory(form, token)
      .then((res) => {
        toast.success(res?.data?.message);
        setSubcategory({});
        allSubcategores(token);
      })
      .catch((error) => {
        console.log(error);
        toast.error(
          error?.response?.data?.message || "Error in creating subcategory"
        );
      });
  };
  // update subcategory
  const updateSubcategory = (form, token) => {
    editSubCategory(form, token)
      .then((res) => {
        toast.success(res?.data?.message);
        setSubcategory({});
        allSubcategores(token);
      })
      .catch((error) => {
        console.log(error);
        toast.error(
          error?.response?.data?.message || "Error in updating subcategory"
        );
      });
  };
  // get subcategory by categoryId
  const getSubcategoryByCategoryId = (id, token) => {
    try {
      const res = getSubCategories(id, token);
      console.log(res.data);
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message ||
          "Error in fetching subcategory for perticular category"
      );
    }
  };
  // delete subcategory
  const removeSubcategory = (id, token) => {
    deleteSubCategory(id, token)
      .then((res) => {
        toast.success(res?.data?.message);
        getAllSubCategories(token);
      })
      .catch((error) => {
        console.log(error);
        toast.error(
          error?.response?.data?.message || "Error in deleteing subcategory"
        );
      });
  };
  return (
    <CategoryContext.Provider
      value={{
        getAllCategories,
        createCategory,
        updateCategory,
        removeCategory,
        removeSubcategory,
        getSubcategoryByCategoryId,
        updateSubcategory,
        createSubcategory,
        allSubcategories: allSubcategores,
        categories,
        subcategories,
        setCategory,
        category,
        setSubcategory,
        subcategory,
        setSubcategories,
        setCategories,
        loading,
        updateCategoryStatus,
        updateSubCategoryStatus
      }}
    >
      {props.children}
    </CategoryContext.Provider>
  );
};

export default CategoryProvider;
