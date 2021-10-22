import "./App.css";
import React, { Component, useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./extraRes/assets/css/style.css";
import "./extraRes/assets/css/icons.css";
import { Link } from 'react-router'

// html 선언
class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      type: "",
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
    const name = this.state.name;
    const type = this.state.hr_group_id;

    return (
      <tr id={this.props.index}>
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
            name="type"
            type="number"
            value={type}
            onChange={this.onChange}
          />
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
      name: "",
      type: "",
    };
    this.callAPI = this.callAPI.bind(this.callAPI);
    this.onChange = this.onChange.bind(this.onChange);
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
    console.log(this.state);
  };

  // db접근 함수
  callAPI = () => {
    console.log(
      JSON.stringify({
        name: this.state.name,
        type: this.state.type,
      })
    );
    fetch("http://192.168.25.6:3002/insertATTCD", {
      method: "POST",
      mode: "cors",
      headers: {
        "content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        name: this.state.name,
        type: this.state.type,
      }),
    })
      .then((res) => res.json())
      .then((json) => console.log(json));
  };

  render() {
    return (
      <div>
        <table id="insertAttendanceTable" className="table table-hover">
          <thead>
            <tr>
              <th>근태 명칭</th>
              <th>근태 유형</th>
            </tr>
          </thead>
          <tbody id="attendance-group">
            <Item
              key={0}
              index={0}
              onTransferChange={this.onChange}
            />
          </tbody>
        </table>
        <div className="table-responsive" align="center">
          <div style={{ textAlign: "center" }}>
            <button id="insertAttCDAction" onClick={this.callAPI}>
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
