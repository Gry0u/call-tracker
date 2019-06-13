import React, { Component } from 'react'
import { HorizontalBar } from 'react-chartjs-2'
import { connect } from 'react-redux'
import { DataFrame } from 'data-forge'

import { fetchReasons } from '../actions'


class Graph extends Component {
  componentDidMount() {
    this.props.fetchReasons()
  }

  render() {
    const summary = new DataFrame({
      values: this.props.reasons,
      considerAllRows: true
    })
      .groupBy(row => row.reason)
      .select(group => ({
        reason: group.first().reason,
        count: group.deflate(row => row.reason).count()
      }))
      .inflate()
      .orderByDescending(row => row.count)

    const labels = summary.getSeries('reason').toArray()
    const values = summary.getSeries('count').toArray()
    return (
      <HorizontalBar
        data={
          {
            labels: labels,
            datasets: [
              {
                label: 'Count',
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: values
              }
            ]
          }
        }
        options={{scales: {
          xAxes: [{
            ticks: { beginAtZero: true, stepSize: 1.0 }
          }]
        }}
      }
      />
    )
  }
 }

const mapStateToProps = state => {
  return {
    reasons: Object.values(state.reasons)
  }
}

export default connect(mapStateToProps, { fetchReasons})(Graph)
