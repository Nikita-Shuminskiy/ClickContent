export const DomainHost = '.clickcontent.eu'
export const HOST_LINK = window.location.hostname == 'clickcontent.eu' ?
    'https://market.clickcontent.eu/' : window.location.hostname == 'clickcontent.svctools.eu' ? 'https://market.clickcontent.svctools.eu/' : 'http://localhost:5175/'

export const CURR_DOMAIN =
    window.location.hostname === 'clickcontent.svctools.eu' ? `domain=.svctools.eu;`
        : window.location.hostname === 'localhost' ? `domain=localhost;`
            : window.location.hostname === 'clickcontent.eu' ? `domain=${DomainHost};`
                : '';

