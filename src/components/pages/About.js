import arrayMove from "array-move";
import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SortableContainer, SortableElement } from "react-sortable-hoc";

const About = () => {
  const [faq, setFaq] = useState([]);
  useEffect(() => {
    loadFaq();
  }, []);

  const loadFaq = async () => {
    const result = await axios.get(`http://localhost:5000/users`);
    setFaq(result.data.reverse());
  };

  const deleteItem = async (id) => {
    await axios.delete(`http://localhost:5000/users/${id}`);
    loadFaq();
  };

  const handleChange = async (index, isValue, id) => {
    const updatedListOfItems = [...faq];
    updatedListOfItems[index].isTrue = isValue;
    let feature = updatedListOfItems.filter((data) => data.id === id);
    setFaq(updatedListOfItems);
    let updateData = await axios.patch(
      `http://localhost:5000/users/${feature[0].id}`,
      feature[0]
    );
    console.log(updateData);
  };

  // console.log(faq);
  const SortableItem = SortableElement(({ item, idx, index }) => (
    <div className="list__card" index={index}>
      <div className="list__card-right">
        <div className="list__card-right--name"> {item.name} </div>
        <div className="list__card-right--description">{item.username}</div>
      </div>
      <div className="action-btn-area">
        <div className="edit-Action-btn">
          <Link to={`/faq/edit/${item.id}`}>
            {" "}
            <button>Edit</button>
          </Link>

          <button className="action__btn" onClick={() => deleteItem(item.id)}>
            Delete
          </button>
        </div>

        <div className="form-check">
          {
            <input
              className="form-check-input"
              type="checkbox"
              id={item.id}
              checked={item.isTrue}
              onChange={() => handleChange(idx, !item.isTrue, item.id)}
            />
          }

          <label className="form-check-label" htmlFor={item.id}>
            FEATURED
          </label>
        </div>
      </div>
    </div>
  ));

  const SortableList = SortableContainer(({ items }) => {
    return (
      <div className="list">
        {items
          .sort((a, b) => a.position - b.position)
          .map((item, idx) => (
            <SortableItem item={item} index={idx} idx={idx} key={item.id} />
          ))}
      </div>
    );
  });

  const onSortEnd = ({ oldIndex, newIndex }) => {
    let arr = arrayMove(faq, oldIndex, newIndex);
    for (let i = 0; i < arr.length; i++) {
      arr[i].position = i;
    }
    setFaq(arr);
  };

  return (
    <Fragment>
      <SortableList items={faq} onSortEnd={onSortEnd} axis="xy" />
    </Fragment>
  );
};

export default About;
