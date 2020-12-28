var objoracle = require('oracledb');

cns = {
    user : "gianni",
    password : "201503823",
    connectString : "(DESCRIPTION =(LOAD_BALANCE = ON)(FAILOVER = ON)(ADDRESS =(PROTOCOL = TCP)(HOST = 34.122.180.20)(PORT = 1521))(ADDRESS = (PROTOCOL = TCP)(HOST = 34.122.180.20)(PORT=1521))(CONNECT_DATA=(SERVICE_NAME=ORCL18)(FAILOVER_MODE=(TYPE=SELECT)(METHOD = BASIC))))"
};

try {
    objoracle.initOracleClient({libDir: '/opt/oracle/instantclient_21_1'});
}catch (err){
    console.error('no se puede conectar al cliente');
}

async function open(sql, binds, autoCommit) {
    let connection = await objoracle.getConnection(cns);
    let result = await connection.execute(sql, binds, {autoCommit: autoCommit});
    close(connection)
    return result;
}

function close(cn){
    cn.release( function (err){
        if (err) {console.error(err.message);}
    });
}

exports.open = open;
exports.close = close;