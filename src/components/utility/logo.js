import React from 'react';
import {Link} from 'react-router-dom';
import {siteConfig} from '../../settings';

export default ({collapsed, role}) => {
    return (
        <div className="isoLogoWrapper">
            {collapsed ? (
                <div>
                    <h3>
                        <Link to={role === 'admin' ? '/admin' : '/member'}>
                            <i className={siteConfig.siteIcon}/>
                        </Link>
                    </h3>
                </div>
            ) : (
                <h3>
                    <Link to={role === 'admin' ? '/admin' : '/member'}>{siteConfig.siteName}</Link>
                </h3>
            )}
        </div>
    );
};
