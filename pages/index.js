import Layout from '../components/common/MyLayout.js';
import SessionCheckModule from '../components/common/SessionCheckModule';
import MainContent from '../components/MainContent';

export default () => (
    <Layout>
        <MainContent />

        <SessionCheckModule>
            <MainContent />
        </SessionCheckModule>
    </Layout>
);
