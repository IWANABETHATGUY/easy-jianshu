import React, { Fragment } from 'react';

const DropList = (props) => {
  const { listClassName, listData, itemClassName, actionList } = props;
  return (
    <Fragment>
      <ul className={listClassName}>
        {
          listData.map((item, index) => (
            <li
              key={index}
              className={itemClassName}
              onClick={actionList[index]}
            >
              {item}
            </li>
          ))
        }
      </ul>
    </Fragment>
  );
};

export default DropList;