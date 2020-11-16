import { func, number } from 'prop-types';

import useFetcherGeneric from './useFetcherGeneric';

const Fetcher = ({ action, timeout, children, update }) => {
    const [renderGeneric] = useFetcherGeneric(action, timeout, update);

    return renderGeneric(children);
};

Fetcher.propTypes = {
    children: func.isRequired,
    action: func.isRequired,
    timeout: number
};

Fetcher.defaultProps = {
    timeout: 0,
    update: null
};

export default Fetcher;
