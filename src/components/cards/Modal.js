import React, { useContext } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Autocomplete, TextField } from '@mui/material'
import Modal from '@mui/material/Modal';
import { CategoryContext } from '../../context/CategoryProvider';
const style = {
    position: 'absolute',
    top: '35%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    display: 'flex',
    flexDirection: "column",
    alignItem: 'center',
    gap: "1rem",
    justifyContent: 'center',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function FormModal({ open, setOpen, name, token }) {
    const categoryContext = useContext(CategoryContext);
    const { categories, createCategory, createSubcategory,
        setCategory,
        category,
        setSubcategory,
        subcategory,
        updateSubcategory,
        updateCategory

    } = categoryContext
    console.log(subcategory);
    // const [addcategory, setAddCategory] = useState({
    //     categoryName:""
    // })
    // const [addsubcategory, setAddSubcategory] = useState({})

    const handleClose = () => {
        setCategory({})
        setSubcategory({})
        setOpen(false)

    };

    const categorySubmit = () => {
        createCategory(category.categoryName, token)
        handleClose()
    }
    const subcategorySubmit = () => {
        let form = {
            subcategory: subcategory.subcategoryName,
            categoryId: subcategory.categoryId._id
        }
        createSubcategory(form, token)
        handleClose()
    }
    const categoryUpdate = () => {
        let form = {
            categoryId: category._id,
            categoryName: category.categoryName
        }
        updateCategory(form, token)
        handleClose()

    }
    const subcategoryUpdate = () => {
        let form = {
            categoryId: subcategory.categoryId._id,
            subcategoryName: subcategory.subcategoryName,
            subId: subcategory._id
        }
        console.log(form);
        updateSubcategory(form, token)
        handleClose()
    }
    return (
        <div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >

                <Box sx={style}>
                    <div style={{ background: " #ffffff", color: "#525", textAlign: "center", padding: "5px 15px", marginBottom: "0.9rem" }}>
                        <span style={{ fontWeight: "bolder", fontSize: "1.5rem" }}>{name}</span>
                    </div>


                    {name === "Add Category" || name === "Update Category" ?
                        <>
                            <TextField id="outlined-basic" label="Category Name" variant="outlined"
                                name="categoryName" value={category?.categoryName || ""} onChange={(e) => setCategory({
                                    ...category,
                                    categoryName: e.target.value
                                })}
                            />
                        </>
                        : name === "Add SubCategory" || name === "Update SubCategory" ?
                            <>
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    options={categories}
                                    getOptionLabel={option => option.categoryName}
                                    onChange={(_, newValue) => {
                                        setSubcategory({
                                            ...subcategory,
                                            categoryId: { _id: newValue._id }
                                        })
                                    }}
                                    value={subcategory?.categoryId}
                                    renderInput={(params) => <TextField
                                        {...params} required label="Choose Category" />}
                                />
                                <TextField name='subcategory' id="outlined-basic" label="Sub Category Name" variant="outlined" value={subcategory?.subcategoryName || ""}
                                    onChange={(e) => setSubcategory({ ...subcategory, subcategoryName: e.target.value })}
                                />
                            </>

                            : ""}

                    <Button onClick={() => {
                        if (name === "Add Category") {
                            categorySubmit()
                        } else if (name === "Add SubCategory") {
                            subcategorySubmit()
                        } else if (name === "Update Category") {
                            categoryUpdate();
                        } else if (name === "Update SubCategory") {
                            subcategoryUpdate()
                        }
                    }} variant="outlined">Submit</Button>
                </Box>
            </Modal>
        </div>
    )
}

export default FormModal