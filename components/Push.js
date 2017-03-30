const Push = props => {
    let { push } = props;

    return (
        <div>
            <h2>
                {push.title}
            </h2>
            <p>
                {push.body}
            </p>
        </div>
    );
};

export default Push;
