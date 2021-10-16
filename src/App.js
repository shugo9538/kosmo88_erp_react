import "./App.css";
import { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./extraRes/assets/css/style.css";
import "./extraRes/assets/css/icons.css";

// html 선언
const Item = (props) => (
  <tr id={props.index}>
    <td>
      <input className="form-control" name="employee_id" type="number" />
    </td>
    <td>
      <input className="form-control" name="use_date" type="number" />
    </td>
    <td>
      <input className="form-control" name="annual_holiday" type="date" />
    </td>
    <td>
      <input className="form-control" name="holiday_id" type="date" />
    </td>
    <td weight="1">
      <div role="button" onClick={() => props.deleteBtn(props.index)}>
        <i className="icon-minus"></i>
      </div>
    </td>
  </tr>
);

class CustomTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: [],
      numChildren: 0,
    };
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  componentDidMount() {
    this.addItem();
  }

  addItem() {
    var index = this.state.numChildren;
    this.setState({
      numChildren: index+1,
    });

    this.state.item.push(
      <Item index={index} key={index} deleteBtn={this.deleteItem} />
    );
  }

  deleteItem = (position) => {
    var tmp = this.state.item.filter((item) => position != item.key);
    this.setState({
      item: tmp,
    });
  };

  render() {
    return (
      <div>
        <table id="insertAttendanceTable" className="table table-hover">
          <thead>
            <tr>
              <th>사원 코드</th>
              <th>휴가 사용일</th>
              <th>연차</th>
              <th>휴가 코드</th>
              <th>삭제 버튼</th>
            </tr>
          </thead>
          <tbody id="attendance-group">{this.state.item}</tbody>
        </table>
        <div
          role="button"
          className="preview col-md-12 md-5"
          id="addAttendance"
          onClick={this.addItem}
        >
          <i className="icon-plus">항목 추가</i>
        </div>
        <div className="table-responsive" align="center">
          <div style={{ textAlign: "center" }}>
            <button id="insertAttendanceAction">등록</button>
            <input type="reset" value="취소" onClick={window.close()} />
          </div>
        </div>
      </div>
    );
  }
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }

  // db접근 함수
  callAPI() {
    fetch("http://localhost:3002/api")
      .then((res) => res.text())
      .then((res) => this.setState({ apiResponse: res }));
  }

  componentDidMount() {
    this.callAPI();
    console.log(this.state);
  }

  // 위에서 함수 Insert()를 뷰 상태 그대로 렌더링
  render() {
    console.log(this.state);
    return <CustomTable />;
  }
}
