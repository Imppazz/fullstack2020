import React from 'react'

const Header = ({ course }) => {
    return <h2>{course.name}</h2>
}

const Part = ({ name, exercises }) => {
    return (
        <>
            <p>{name} {exercises}</p>
        </>
    )
}

const Content = ({ course }) => {
    return (
        <div>
            {course.parts.map(part =>
                <div key={part.id}>
                    <Part name={part.name} exercises={part.exercises} />
                </div>
            )}
        </div>
    )
}

const Total = ({ course }) => {
    const array = course.parts.map(part => part.exercises)
    let total = array.reduce((accumulator, currentValue) => accumulator + currentValue)
    return (
        <>
            <strong>total of {total} exercises</strong>
        </>
    )
}

const Course = ({ courses }) => {
    return (
        <>
            {courses.map((course, i) =>
                <div key={i}>
                    <Header course={course} />
                    <Content course={course} />
                    <Total course={course} />
                </div>
            )}
        </>
    )
}

export default Course