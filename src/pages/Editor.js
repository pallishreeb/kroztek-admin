import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import styles

const ProductDescriptionEditor = ({ value, onChange }) => {
 
 return (
    <div>
      <ReactQuill
       value={value} onChange={onChange}
        modules={ProductDescriptionEditor.modules}
        formats={ProductDescriptionEditor.formats}
        theme="snow"
      />
    </div>
  );
};

// Define modules and formats for the editor
ProductDescriptionEditor.modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['bold', 'italic', 'underline'],
    [{ color: [] }, { background: [] }],
  ],
};

ProductDescriptionEditor.formats = [
  'header',
  'font',
  'list',
  'bold',
  'italic',
  'underline',
  'color',
  'background',
];

export default ProductDescriptionEditor;
