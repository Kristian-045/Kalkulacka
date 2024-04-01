#include <stdlib.h>
#include <stdio.h>

int main(int argc, char *argv[]){
    FILE *nodeProcess = popen("node ../src/profiling.js", "w");

    if (nodeProcess == NULL) {
        fprintf(stderr, "Failed to open Node.js process.\n");
        return 1;
    }

    char buffer[1024];
    while (fgets(buffer, sizeof(buffer), stdin) != NULL) {
        // Write input data to Node.js process
        fprintf(nodeProcess, "%s", buffer);
    }

    // Close the Node.js process
    pclose(nodeProcess);

    return 0;
}