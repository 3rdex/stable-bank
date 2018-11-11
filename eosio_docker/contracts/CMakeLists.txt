cmake_minimum_required(VERSION 3.5)
project(3rdex VERSION 1.0.0)

find_package(eosio.cdt)
add_contract( stablebank stablebank stablebank/stablebank.cpp )

set (deploy_command docker exec eosio_notechain_container /bin/bash -c 'deploy_contract.sh stablebank stablebankac stablebankwa PW5J9A1K4TnRxA5Uoecm1ysGd1UfXH8qZMPTEJzA3cLhm6gMqmoaq')
add_custom_target(deploy)
add_custom_command(
    TARGET deploy
    POST_BUILD
    COMMAND ${deploy_command}
    WORKING_DIRECTORY ${CMAKE_CURRENT_SOURCE_DIR}
    COMMENT "deploy"
)
