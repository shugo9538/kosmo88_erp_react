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

    return (
      <tr id={this.props.index}>
        
        {/* <td>
          <select 
            className="form-control"
            name="id"
            type="number"
            onChange={this.onChange}>
            <option value="100" selected={true}>인사</option>
            <option value="200">근태</option>
            <option value="300">급여</option>
            <option value="400">기타</option>
            <option value="500">시스템설정</option>
            <option value="600">전체</option>
          </select>   
        </td>  */}

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
      </tr>
    );
  }
}

class HRCodeGroupTable extends Component {
  constructor(props) {
    super(props);
    this.numChildren = Number(0);
    this.state = {
      id: "",
      name: "",
    };
    this.callAPI = this.callAPI.bind(this.callAPI);
    this.onChange = this.onChange.bind(this.onChange);
    this.onClose = this.onClose.bind(this.onClose);
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
      })
    );
    fetch("http://localhost:3002/insertHRGroupCode", {
      method: "POST",
      mode: "cors",
      headers: {
        "content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        id: this.state.id,
        name: this.state.name,
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
              <th>인사코드 그룹</th>
              <th>인사코드 그룹명</th>
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
    return <HRCodeGroupTable />;
  }
}