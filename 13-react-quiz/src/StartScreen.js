export  default function StartScreen({numberOfQuestions,dispatch}) {
    return (
        <div className='start'>
            <h2>
                Welcome to the React Quiz!
            </h2>
            <h3>
                {numberOfQuestions} questions to test your React Mastery!
            </h3>
            <button className='btn btn-ui' onClick={() => dispatch({ type: 'start' })}>
                Lets get started!
            </button>
        </div>
    )

}