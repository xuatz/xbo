import Header from './Header';

const layoutStyle = {
    margin: '15px 10px',
    padding: '15px 10px',
    border: '1px solid #DDD',
};

const Layout = props => (
    <div style={layoutStyle}>
        <Header />
        {props.children}
    </div>
);

export default Layout;
