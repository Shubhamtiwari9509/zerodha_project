import React from 'react';
function Team () {
    return (
         <div className="container">
      <div className="row p-3 mt-5 border-top">
        <h1 className="text-center ">People</h1>
      </div>

      <div
        className="row p-3 text-muted"
        style={{ lineHeight: "1.8", fontSize: "1.2em" }}
      >
        <div className="col-6 p-3 text-center">
          <img
            src="media/images/shubhamtiwari.jpeg"
            style={{ borderRadius: "100%", width: "50%" }}
          />
          <h4 className="mt-5">Shubham Tiwari</h4>
          <h6>Founder, CEO</h6>
        </div>
        <div className="col-6 p-3">
        <p>
            Shubham is a self-driven developer skilled in Python, React, and MERN stack. 
            His persistence and clarity-driven approach help him overcome challenges and adapt quickly across frameworks.
          </p>
          <p>
            He values clean, maintainable code and blends Hindi and English to make technical concepts approachable.
          </p>
          <p>
            Exploring flowcharts and visual aids is his zen.
          </p>
            Connect on <a href="">Homepage</a> / <a href="">TradingQnA</a> /{" "}
            <a href="">Twitter</a>
        </div>
      </div>
    </div>
      );
}

export default Team;