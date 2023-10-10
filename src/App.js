import React, { useState } from "react";
import ParentAdd from "./Parent";
import "./styles.css";

function App() {
  const [parents, setParents] = useState([]);

  const handleAddParent = (name) => {
    setParents([...parents, { name, children: [] }]);
  };

  const handleAddChild = (parentId) => {
    const childName = prompt("Enter child name:");
    if (childName && childName.trim() !== "") {
      setParents((prevParents) =>
        prevParents.map((parent, index) =>
          index === parentId
            ? {
                ...parent,
                children: [
                  ...parent.children,
                  { name: childName, grandchildren: [] }
                ]
              }
            : parent
        )
      );
    }
  };

  const handleAddGrandChild = (parentId, childId) => {
    const grandChildName = prompt("Enter grandchild name:");
    if (grandChildName && grandChildName.trim() !== "") {
      setParents((prevParents) =>
        prevParents.map((parent, index) =>
          index === parentId
            ? {
                ...parent,
                children: parent.children.map((child, childIndex) =>
                  childIndex === childId
                    ? {
                        ...child,
                        grandchildren: [
                          ...(child.grandchildren || []),
                          grandChildName
                        ]
                      }
                    : child
                )
              }
            : parent
        )
      );
    }
  };

  const handleEditName = (parentId, childId, grandchildId) => {
    const newName = prompt("Edit Name:");
    if (newName && newName.trim() !== "") {
      setParents((prevParents) =>
        prevParents.map((parent, index) =>
          index === parentId
            ? {
                ...parent,
                children: parent.children.map((child, childIndex) =>
                  childIndex === childId
                    ? {
                        ...child,
                        grandchildren: child.grandchildren.map(
                          (grandchild, grandchildIndex) =>
                            grandchildIndex === grandchildId
                              ? newName
                              : grandchild
                        )
                      }
                    : child
                )
              }
            : parent
        )
      );
    }
  };

  return (
    <div className="App">
      <h1>Dynamic To Do App</h1>

      <ParentAdd onAddParent={handleAddParent} />
      <ul>
        {parents.map((parent, parentId) => (
          <li key={parentId}>
            {parentId + 1}. {parent.name}
            <button
              onClick={() => {
                const newName = prompt("Edit Name:");
                if (newName && newName.trim() !== "") {
                  setParents((prevParents) =>
                    prevParents.map((prevParent, index) =>
                      index === parentId
                        ? { ...prevParent, name: newName }
                        : prevParent
                    )
                  );
                }
              }}
            >
              Edit
            </button>
            <button
              onClick={() =>
                setParents((prevParents) =>
                  prevParents.filter((_, index) => index !== parentId)
                )
              }
            >
              Delete
            </button>
            <button onClick={() => handleAddChild(parentId)}>Child Add</button>
            <ul>
              {parent.children.map((child, childId) => (
                <li key={childId}>
                  {parentId + 1}.{childId + 1} {child.name}
                  <button
                    onClick={() => {
                      const newName = prompt("Edit Name:");
                      if (newName && newName.trim() !== "") {
                        setParents((prevParents) =>
                          prevParents.map((prevParent, index) =>
                            index === parentId
                              ? {
                                  ...prevParent,
                                  children: prevParent.children.map(
                                    (prevChild, childIndex) =>
                                      childIndex === childId
                                        ? { ...prevChild, name: newName }
                                        : prevChild
                                  )
                                }
                              : prevParent
                          )
                        );
                      }
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() =>
                      setParents((prevParents) =>
                        prevParents.map((prevParent, index) =>
                          index === parentId
                            ? {
                                ...prevParent,
                                children: prevParent.children.filter(
                                  (_, index) => index !== childId
                                )
                              }
                            : prevParent
                        )
                      )
                    }
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleAddGrandChild(parentId, childId)}
                  >
                    Grand SubChild Add
                  </button>
                  <ul>
                    {child.grandchildren &&
                      child.grandchildren.map((grandchild, grandchildId) => (
                        <li key={grandchildId}>
                          {parentId + 1}.{childId + 1}.{grandchildId + 1}{" "}
                          {grandchild}
                          <button
                            onClick={() =>
                              handleEditName(parentId, childId, grandchildId)
                            }
                          >
                            Edit
                          </button>
                          <button
                            onClick={() =>
                              setParents((prevParents) =>
                                prevParents.map((prevParent, index) =>
                                  index === parentId
                                    ? {
                                        ...prevParent,
                                        children: prevParent.children.map(
                                          (prevChild, childIndex) =>
                                            childIndex === childId
                                              ? {
                                                  ...prevChild,
                                                  grandchildren: prevChild.grandchildren.filter(
                                                    (_, grandchildIndex) =>
                                                      grandchildIndex !==
                                                      grandchildId
                                                  )
                                                }
                                              : prevChild
                                        )
                                      }
                                    : prevParent
                                )
                              )
                            }
                          >
                            Delete
                          </button>
                        </li>
                      ))}
                  </ul>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
