const styles = {
    container: {
        display: 'flex',
    },
    item: {
        flex: '1',
    },
};

export const Container = ({ style = {}, children } = props) => (
    <div
        style={{
            ...styles.container,
            ...style,
        }}
    >
        {children}
    </div>
);

export const Item = ({ style = {}, children } = props) => (
    <div
        style={{
            ...styles.item,
            ...style,
        }}
    >
        {children}
    </div>
);
