import "./App.css";
import React, { Component, useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./extraRes/assets/css/style.css";
import "./extraRes/assets/css/icons.css";

// html 선언
class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      annual_income: "",
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
    const annual_income = this.state.annual_income;

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
            name="annual_income"
            type="number"
            value={annual_income}
            onChange={this.onChange}
          />
        </td>
      </tr>
    );
  }
}

class PositionTable extends Component {
  constructor(props) {
    super(props);
    this.numChildren = Number(0);
    this.state = {
      id: "",
      name: "",
      annual_income: "",
    };
    // this.addItem = this.addItem.bind(this);
    // this.deleteItem = this.deleteItem.bind(this);
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

  deleteItem = (position) => {
    console.log(position);
    var tmp = this.list.filter((item) => position != item.index);
    console.log(tmp);
    this.list = tmp;
  };
  onClose() {
    window.opener = null;
    window.open("", "_self");
    window.close();
  }
  // db접근 함수
  callAPI = () => {
    console.log(
      JSON.stringify({
        id: this.state.id,
        name: this.state.name,
        annual_income: this.state.annual_income,
      })
    );
    fetch("http://localhost:3002/insertPositionCode", {
      method: "POST",
      mode: "cors",
      headers: {
        "content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        id: this.state.id,
        name: this.state.name,
        annual_income: this.state.annual_income,
      }),
    })
      .then((res) => res.json())
      .then((json) => console.log(json));
      this.onClose();
  };

  render() {
    return (
      <div>
        <table id="insertAttendanceTable" className="table table-hover">
          <thead>
            <tr>
              <th>직급 코드</th>
              <th>직급 코드명</th>
              <th>직급별 연봉</th>
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
    return <PositionTable />;
  }
}