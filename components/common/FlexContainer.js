const styles = {
    container: {
        display: 'flex'
    },
    item: {
        flex: 'auto'
    }
};

export const Container = ({ style = {}, children } = props) => (
    <div
        style={{
            ...styles.container,
            ...style
        }}
    >
        {children}
    </div>
);

export const Item = ({ style = {}, children } = props) => (
    <div
        style={{
            ...styles.item,
            ...style
        }}
    >
        {children}
    </div>
);
