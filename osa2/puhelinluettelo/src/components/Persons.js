import React from 'react'

const Persons = ({ persons, filter, deletePerson }) => {
    const personsFiltered = persons
        .filter(person =>
            person.name.toLowerCase().includes(filter.toLowerCase()))
    return (
        <div>
            {personsFiltered.map(person =>
                <Person key={person.id} person={person} deletePerson={() => deletePerson(person.id)} />
            )}
        </div>
    )
}

const Person = ({ person, deletePerson }) => {
    return <div>
        {person.name} {person.number} <button onClick={deletePerson}> delete </button>
    </div>
}


export default Persons