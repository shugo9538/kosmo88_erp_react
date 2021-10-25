import "./App.css";
import React, { Component, useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./extraRes/assets/css/style.css";
import "./extraRes/assets/css/icons.css";
import { Link } from "react-router";

// html 선언
class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      hr_group_id: "",
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
    console.log("in item:", this.state);
    this.props.onTransferChange(e);
  };

  render() {
    const id = this.state.id;
    const name = this.state.name;
    const hr_group_id = this.state.hr_group_id;

    return (
      <tr id={this.props.index}>
        <td>
          <input
            className="form-control"
            name="id"
            type="number"
            value={id}
            onChange={this.onChange}
          />
        </td>
        <td>
          <input
            className="form-control"
            name="name"
            type="text"
            value={name}
            onChange={this.onChange}
          />
        </td>
        <td>
          <input
            className="form-control"
            name="hr_group_id"
            type="number"
            value={hr_group_id}
            onChange={this.onChange}
          />
        </td>
        <td weight="1">
          <div
            role="button"
            onClick={() => this.props.deleteBtn(this.props.index)}
          >
            <i className="icon-minus"></i>
          </div>
        </td>
      </tr>
    );
  }
}

class CustomTable extends Component {
  constructor(props) {
    super(props);
    this.numChildren = Number(0);
    this.state = {
      id: "",
      name: "",
      hr_group_id: "",
    };
    // this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.callAPI = this.callAPI.bind(this.callAPI);
    this.onChange = this.onChange.bind(this.onChange);
    this.onClose = this.onClose.bind(this.onClose);
    // this.addItem();
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
    console.log(this.state);
  };

  // addItem() {
  //   this.numChildren = this.numChildren + 1;
  //   console.log(this.numChildren);

  //   this.list.push(
  //     <Item
  //       key={this.numChildren}
  //       index={this.numChildren}
  //       onTransferChange={this.onChange}
  //       deleteBtn={this.deleteItem}
  //     />
  //   );

  //   // var tmp = {
  //   //   index: this.numChildren,
  //   //   item: { id: "", name: "", hr_group_id: "" },
  //   // };
  //   // this.state.push(tmp);
  //   console.log(this.list);
  // }

  deleteItem = (position) => {
    console.log(position);
    var tmp = this.list.filter((item) => position != item.index);
    console.log(tmp);
    this.list = tmp;
  };

  // db접근 함수
  callAPI = () => {
    console.log(
      JSON.stringify({
        id: this.state.id,
        name: this.state.name,
        hr_group_id: this.state.hr_group_id,
      })
    );
    fetch("http://192.168.25.6:3002/insertHRCode", {
      method: "POST",
      mode: "cors",
      headers: {
        "content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        id: this.state.id,
        name: this.state.name,
        hr_group_id: this.state.hr_group_id,
      }),
    })
      .then((res) => res.json())
      .then((json) => console.log(json));

      this.onClose();
  };

  onClose() {
    window.opener = null;
    window.open("", "_self");
    window.close();
  }

  render() {
    return (
      <div>
        <table id="insertAttendanceTable" className="table table-hover">
          <thead>
            <tr>
              <th>인사 코드</th>
              <th>인사 코드명</th>
              <th>인사 코드 그룹</th>
              <th>삭제 버튼</th>
            </tr>
          </thead>
          <tbody id="attendance-group">
            <Item
              key={0}
              index={0}
              onTransferChange={this.onChange}
              deleteBtn={this.deleteItem}
            />
          </tbody>
        </table>
        {
          // <div
          //   role="button"
          //   className="preview col-md-12 md-5"
          //   id="addAttendance"
          //   onClick={this.addItem}
          // >
          //   <i className="icon-plus">항목 추가</i>
          // </div>
        }
        <div className="table-responsive" align="center">
          <div style={{ textAlign: "center" }}>
            <button id="insertAttendanceAction" onClick={this.callAPI}>
              등록
            </button>
            <input type="reset" value="취소" />
          </div>
        </div>
      </div>
    );
  }
}

export default class App extends Component {
  // 위에서 함수 Insert()를 뷰 상태 그대로 렌더링
  render() {
    return <CustomTable />;
  }
}
