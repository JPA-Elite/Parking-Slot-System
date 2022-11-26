//Import
import readline from "readline";
import util from "util";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const fs = require("fs");
let data = require("./data/owner.json");
let data2 = require("./data/parking_slot.json");

//Function of diff_hours
function diff_hours(dt2, dt1) {
  var diff = (dt2.getTime() - dt1.getTime()) / 1000;
  diff /= 60 * 60;
  return diff;
}

//Function of ParseDate
function parseDate(d) {
  const month = d.toLocaleString("default", { month: "long" });
  const date = d.getDate();
  const year = d.getFullYear();
  const hour = d.getHours();
  const mins = d.getMinutes();
  const sec = d.getSeconds();
  const da = `${month} ${date}, ${year} ${hour}:${mins}:${sec}`;
  return new Date(da);
}

//Function of Fulldate

function fullDate(d) {
  const month = d.toLocaleString("default", { month: "long" });
  const date = d.getDate();
  const year = d.getFullYear();
  const hour = d.getHours();
  const mins = d.getMinutes();
  const sec = d.getSeconds();
  const da = `${month} ${date}, ${year} ${hour}:${mins}:${sec}`;
  return da;
}

console.log("\x1b[32m","\n                       XYZ Corp. Parking System","\x1b[0m");
console.log("\n------------------------------------------------------------------------\nDate: " +fullDate(new Date()) 
);



let prompt = "Select action [ p - park, u - unpark, m - map, x - exit ]:";
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt,
});

rl.prompt();

rl.on("line", (line) => {
  switch (line.trim()) {
    // Exit the system
    case "x":
      rl.close();

      break;
    // redirects to parking process
    case "p":
      rl.question(
        "Vehicle size [ 0-Small, 1-Medium, 2-Large ]: ",
        function (size) {
          switch (size) {
            case "0":
              rl.question(
                "Available Slot [ 0-SP, 1-MP, 2-LP ]: ",
                function (slot) {
                // stores temporary data 
                  const store_A = new Array();
                  const store_B = new Array();
                  const store_C = new Array();
                  if (slot == 0) {
                    console.log(
                      "\x1b[36m%s\x1b[0m",
                      "Parking A (types: small): "
                    );
                    let a_count = 0;
                    for (let i = 0; i < 10; i++) {
                      let space = JSON.stringify(data2[0].Park_A[i].occupied);
                      let type = JSON.stringify(data2[0].Park_A[i].p_type);
                      if (space == '"none"' && type == '"SP"') {
                        console.log(
                          "Slot (" +
                          JSON.stringify(data2[0].Park_A[i].space)
                            .replace('"', " ")
                            .replace('"', " ") +
                          ") -> occupied: " +
                          space
                        );
                        store_A[i] = parseInt(
                          JSON.stringify(data2[0].Park_A[i].space)
                            .replace('"', " ")
                            .replace('"', " "),
                          10
                        );
                        a_count++;
                      }
                    }
                    if (a_count == 0) {
                      console.log(
                        "Sorry, there is no available slot for now in this parking area!"
                      );
                    }

                    // Parking B
                    console.log(
                      "\x1b[36m%s\x1b[0m",
                      "\nParking B (types: small): "
                    );
                    let b_count = 0;
                    for (let i = 0; i < 10; i++) {
                      let space = JSON.stringify(data2[1].Park_B[i].occupied);
                      let type = JSON.stringify(data2[1].Park_B[i].p_type);
                      if (space == '"none"' && type == '"SP"') {
                        console.log(
                          "Slot (" +
                          JSON.stringify(data2[1].Park_B[i].space)
                            .replace('"', " ")
                            .replace('"', " ") +
                          ") -> occupied: " +
                          space
                        );
                        store_B[i] = parseInt(
                          JSON.stringify(data2[1].Park_B[i].space)
                            .replace('"', " ")
                            .replace('"', " "),
                          10
                        );
                        b_count++;
                      }
                    }
                    if (b_count == 0) {
                      console.log(
                        "Sorry, there is no available slot for now in this parking area!"
                      );
                    }

                    // Parking C

                    console.log(
                      "\x1b[36m%s\x1b[0m",
                      "\nParking C (types: small): "
                    );
                    let c_count = 0;
                    for (let i = 0; i < 10; i++) {
                      let space = JSON.stringify(data2[2].Park_C[i].occupied);
                      let type = JSON.stringify(data2[2].Park_C[i].p_type);

                      if (space == '"none"' && type == '"SP"') {
                        console.log(
                          "Slot (" +
                          JSON.stringify(data2[2].Park_C[i].space)
                            .replace('"', " ")
                            .replace('"', " ") +
                          ") -> occupied: " +
                          space
                        );
                        store_C[i] = parseInt(
                          JSON.stringify(data2[2].Park_C[i].space)
                            .replace('"', " ")
                            .replace('"', " "),
                          10
                        );
                        c_count++;
                      }
                    }
                    if (c_count == 0) {
                      console.log(
                        "Sorry, there is no available slot for now in this parking area!"
                      );
                    }

                    rl.question("\nChoose slot(ex: A-1): ", function (c_slot) {
                      const array = c_slot.split("-");

                      try {
                        rl.question(
                          "Name of the vehicle's owner: ",
                          function (name) {
                            let check_process = false;
                            if (
                              array[0].toLowerCase() == "a" &&
                              store_A.includes(parseInt(array[1], 10))
                            ) {
                              data2[0].Park_A[array[1] - 1].occupied = "yes";
                              fs.writeFileSync(
                                "./data/parking_slot.json",
                                JSON.stringify(data2, null, 4)
                              );

                              check_process = true;
                            } else if (
                              array[0].toLowerCase() == "b" &&
                              store_B.includes(parseInt(array[1], 10))
                            ) {
                              data2[1].Park_B[array[1] - 1].occupied = "yes";
                              fs.writeFileSync(
                                "./data/parking_slot.json",
                                JSON.stringify(data2, null, 4)
                              );
                              check_process = true;
                            } else if (
                              array[0].toLowerCase() == "c" &&
                              store_C.includes(parseInt(array[1], 10))
                            ) {
                              data2[2].Park_C[array[1] - 1].occupied = "yes";
                              fs.writeFileSync(
                                "./data/parking_slot.json",
                                JSON.stringify(data2, null, 4)
                              );
                              check_process = true;
                            } else {
                              console.log("Action failed, please try again!");
                            }
                            if (check_process) {
                              console.log("vehicle successfully parked!");
                              var jsonObject = [
                                {
                                  park: array[0].toUpperCase(),
                                  space: parseInt(array[1], 10),
                                  name: name,
                                  v_size: size,
                                  p_type: "SP",
                                  date: fullDate(new Date())
                                },

                              ];
                              data = require("./data/owner.json");
                              let combineData = JSON.stringify(
                                data.concat(jsonObject),
                                null,
                                4
                              );
                              fs.writeFileSync("./data/owner.json", combineData);
                              delete require.cache[
                                require.resolve("./data/owner.json")
                              ];
                              data = require("./data/owner.json");
                            }
                            delete require.cache[
                              require.resolve("./data/parking_slot.json")
                            ];
                            data2 = require("./data/parking_slot.json");
                          }
                        );
                      } catch (e) {
                        console.log(e.message);
                      }
                    });
                  } else if (slot == 1) {
                    console.log(
                      "\x1b[36m%s\x1b[0m",
                      "Parking A (types: medium): "
                    );

                    let a_count = 0;
                    for (let i = 0; i < 10; i++) {
                      let space = JSON.stringify(data2[0].Park_A[i].occupied);
                      let type = JSON.stringify(data2[0].Park_A[i].p_type);
                      if (space == '"none"' && type == '"MP"') {
                        console.log(
                          "Slot (" +
                          JSON.stringify(data2[0].Park_A[i].space)
                            .replace('"', " ")
                            .replace('"', " ") +
                          ") -> occupied: " +
                          space
                        );
                        store_A[i] = parseInt(
                          JSON.stringify(data2[0].Park_A[i].space)
                            .replace('"', " ")
                            .replace('"', " "),
                          10
                        );
                        a_count++;
                      }
                    }

                    //Display Error Messages
                    if (a_count == 0) {
                      console.log(
                        "Sorry, there is no available slot for now in this parking area!"
                      );
                    }

                    // Parking B
                    console.log(
                      "\x1b[36m%s\x1b[0m",
                      "\nParking B (types: medium): "
                    );
                    let b_count = 0;
                    for (let i = 0; i < 10; i++) {
                      let space = JSON.stringify(data2[1].Park_B[i].occupied);
                      let type = JSON.stringify(data2[1].Park_B[i].p_type);
                      if (space == '"none"' && type == '"MP"') {
                        console.log(
                          "Slot (" +
                          JSON.stringify(data2[1].Park_B[i].space)
                            .replace('"', " ")
                            .replace('"', " ") +
                          ") -> occupied: " +
                          space
                        );
                        store_B[i] = parseInt(
                          JSON.stringify(data2[1].Park_B[i].space)
                            .replace('"', " ")
                            .replace('"', " "),
                          10
                        );
                        b_count++;
                      }
                    }
                    if (b_count == 0) {
                      console.log(
                        "Sorry, there is no available slot for now in this parking area!"
                      );
                    }
                    // Parking C

                    console.log(
                      "\x1b[36m%s\x1b[0m",
                      "\nParking C (types: medium): "
                    );
                    let c_count = 0;
                    for (let i = 0; i < 10; i++) {
                      let space = JSON.stringify(data2[2].Park_C[i].occupied);
                      let type = JSON.stringify(data2[2].Park_C[i].p_type);

                      if (space == '"none"' && type == '"MP"') {
                        console.log(
                          "Slot (" +
                          JSON.stringify(data2[2].Park_C[i].space)
                            .replace('"', " ")
                            .replace('"', " ") +
                          ") -> occupied: " +
                          space
                        );
                        store_C[i] = parseInt(
                          JSON.stringify(data2[2].Park_C[i].space)
                            .replace('"', " ")
                            .replace('"', " "),
                          10
                        );
                        c_count++;
                      }
                    }

                    //Error Display
                    if (c_count == 0) {
                      console.log(
                        "Sorry, there is no available slot for now in this parking area!"
                      );
                    }

                    //Choose slot
                    rl.question("\nChoose slot(ex: A-1): ", function (c_slot) {
                      const array = c_slot.split("-");

                      try {
                        rl.question(
                          "Name of the vehicle's owner: ",
                          function (name) {
                            let check_process = false;
                            if (
                              array[0].toLowerCase() == "a" &&
                              store_A.includes(parseInt(array[1], 10))
                            ) {
                              data2[0].Park_A[array[1] - 1].occupied = "yes";
                              fs.writeFileSync(
                                "./data/parking_slot.json",
                                JSON.stringify(data2, null, 4)
                              );
                              check_process = true;
                            } else if (
                              array[0].toLowerCase() == "b" &&
                              store_B.includes(parseInt(array[1], 10))
                            ) {
                              data2[1].Park_B[array[1] - 1].occupied = "yes";
                              fs.writeFileSync(
                                "./data/parking_slot.json",
                                JSON.stringify(data2, null, 4)
                              );
                              check_process = true;
                            } else if (
                              array[0].toLowerCase() == "c" &&
                              store_C.includes(parseInt(array[1], 10))
                            ) {
                              data2[2].Park_C[array[1] - 1].occupied = "yes";
                              fs.writeFileSync(
                                "./data/parking_slot.json",
                                JSON.stringify(data2, null, 4)
                              );
                              check_process = true;
                            } else {
                              console.log("Action failed, please try again!");
                            }
                            if (check_process) {
                              console.log("vehicle successfully parked!");
                              var jsonObject = [
                                {
                                  park: array[0].toUpperCase(),
                                  space: parseInt(array[1], 10),
                                  name: name,
                                  v_size: size,
                                  p_type: "MP",
                                  date: fullDate(new Date())
                                },
                              ];

                              let combineData = JSON.stringify(
                                data.concat(jsonObject),
                                null,
                                4
                              );
                              // updating data to owner.json file
                              fs.writeFileSync("./data/owner.json", combineData);
                              // delete cache to keep data updated
                              delete require.cache[
                                require.resolve("./data/owner.json")
                              ];
                              data = require("./data/owner.json");
                            }
                             // delete cache to keep data updated
                            delete require.cache[
                              require.resolve("./data/parking_slot.json")
                            ];
                            data2 = require("./data/parking_slot.json");
                          }
                        );
                      } catch (e) {
                        console.log(e.message);
                      }
                    });
                  } else if (slot == 2) {

                    //Display Parking information
                    console.log(
                      "\x1b[36m%s\x1b[0m",
                      "Parking A (types: large): "
                    );
                    let a_count = 0;
                    for (let i = 0; i < 10; i++) {
                      let space = JSON.stringify(data2[0].Park_A[i].occupied);
                      let type = JSON.stringify(data2[0].Park_A[i].p_type);
                      if (space == '"none"' && type == '"LP"') {
                        console.log(
                          "Slot (" +
                          JSON.stringify(data2[0].Park_A[i].space)
                            .replace('"', " ")
                            .replace('"', " ") +
                          ") -> occupied: " +
                          space
                        );
                        store_A[i] = parseInt(
                          JSON.stringify(data2[0].Park_A[i].space)
                            .replace('"', " ")
                            .replace('"', " "),
                          10
                        );
                        a_count++;
                      }
                    }

                    //Display Error Messages
                    if (a_count == 0) {
                      console.log(
                        "Sorry, there is no available slot for now in this parking area!"
                      );
                    }

                    // Parking B
                    console.log(
                      "\x1b[36m%s\x1b[0m",
                      "\nParking B (types: large): "
                    );
                    let b_count = 0;
                    for (let i = 0; i < 10; i++) {
                      let space = JSON.stringify(data2[1].Park_B[i].occupied);
                      let type = JSON.stringify(data2[1].Park_B[i].p_type);
                      if (space == '"none"' && type == '"LP"') {
                        console.log(
                          "Slot (" +
                          JSON.stringify(data2[1].Park_B[i].space)
                            .replace('"', " ")
                            .replace('"', " ") +
                          ") -> occupied: " +
                          space
                        );
                        store_B[i] = parseInt(
                          JSON.stringify(data2[1].Park_B[i].space)
                            .replace('"', " ")
                            .replace('"', " "),
                          10
                        );
                        b_count++;
                      }
                    }
                    //Display Error Messages
                    if (b_count == 0) {
                      console.log(
                        "Sorry, there is no available slot for now in this parking area!"
                      );
                    }
                    // Parking C

                    console.log(
                      "\x1b[36m%s\x1b[0m",
                      "\nParking C (types: large): "
                    );
                    let c_count = 0;
                    for (let i = 0; i < 10; i++) {
                      let space = JSON.stringify(data2[2].Park_C[i].occupied);
                      let type = JSON.stringify(data2[2].Park_C[i].p_type);

                      if (space == '"none"' && type == '"LP"') {
                        console.log(
                          "Slot (" +
                          JSON.stringify(data2[2].Park_C[i].space)
                            .replace('"', " ")
                            .replace('"', " ") +
                          ") -> occupied: " +
                          space
                        );
                        store_C[i] = parseInt(
                          JSON.stringify(data2[2].Park_C[i].space)
                            .replace('"', " ")
                            .replace('"', " "),
                          10
                        );
                        c_count++;
                      }
                    }

                    //Display Error Parking Area
                    if (c_count == 0) {
                      console.log(
                        "Sorry, there is no available slot for now in this parking area!"
                      );
                    }

                    //Diplay Choose Slots
                    rl.question("\nChoose slot(ex: A-1): ", function (c_slot) {
                      const array = c_slot.split("-");

                      //Display question
                      try {
                        rl.question(
                          "Name of the vehicle's owner: ",
                          function (name) {
                            let check_process = false;
                            if (
                              array[0].toLowerCase() == "a" &&
                              store_A.includes(parseInt(array[1], 10))
                            ) {
                              data2[0].Park_A[array[1] - 1].occupied = "yes";
                              fs.writeFileSync(
                                "./data/parking_slot.json",
                                JSON.stringify(data2, null, 4)
                              );
                              check_process = true;
                            } else if (
                              array[0].toLowerCase() == "b" &&
                              store_B.includes(parseInt(array[1], 10))
                            ) {
                              data2[1].Park_B[array[1] - 1].occupied = "yes";
                              fs.writeFileSync(
                                "./data/parking_slot.json",
                                JSON.stringify(data2, null, 4)
                              );
                              check_process = true;
                            } else if (
                              array[0].toLowerCase() == "c" &&
                              store_C.includes(parseInt(array[1], 10))
                            ) {
                              data2[2].Park_C[array[1] - 1].occupied = "yes";
                              fs.writeFileSync(
                                "./data/parking_slot.json",
                                JSON.stringify(data2, null, 4)
                              );
                              check_process = true;
                            } else {
                              console.log("Action failed, please try again!");
                            }

                            //Display Success Parked
                            if (check_process) {
                              console.log("vehicle successfully parked!");
                              var jsonObject = [
                                {
                                  park: array[0].toUpperCase(),
                                  space: parseInt(array[1], 10),
                                  name: name,
                                  v_size: size,
                                  p_type: "LP",
                                  date: fullDate(new Date())
                                },
                              ];

                              let combineData = JSON.stringify(
                                data.concat(jsonObject),
                                null,
                                4
                              );
                              fs.writeFileSync("./data/owner.json", combineData);
                              delete require.cache[
                                require.resolve("./data/owner.json")
                              ];
                              data = require("./data/owner.json");
                            }
                            delete require.cache[
                              require.resolve("./data/parking_slot.json")
                            ];
                            data2 = require("./data/parking_slot.json");
                          }
                        );

                      } catch (e) {
                        console.log(e.message);
                      }
                    });
                  }
                }
              );
              break;

            //Display Available Slot
            case "1":
              rl.question("Available Slot [ 1-MP, 2-LP ]: ", function (slot) {
                const store_A = new Array();
                const store_B = new Array();
                const store_C = new Array();

                if (slot == 1) {
                  console.log(
                    "\x1b[36m%s\x1b[0m",
                    "Parking A (types: medium): "
                  );
                  let a_count = 0;
                  for (let i = 0; i < 10; i++) {
                    let space = JSON.stringify(data2[0].Park_A[i].occupied);
                    let type = JSON.stringify(data2[0].Park_A[i].p_type);
                    if (space == '"none"' && type == '"MP"') {
                      console.log(
                        "Slot (" +
                        JSON.stringify(data2[0].Park_A[i].space)
                          .replace('"', " ")
                          .replace('"', " ") +
                        ") -> occupied: " +
                        space
                      );
                      store_A[i] = parseInt(
                        JSON.stringify(data2[0].Park_A[i].space)
                          .replace('"', " ")
                          .replace('"', " "),
                        10
                      );
                      a_count++;
                    }
                  }

                  //Display Error Messages
                  if (a_count == 0) {
                    console.log(
                      "Sorry, there is no available slot for now in this parking area!"
                    );
                  }
                  // Parking B
                  console.log(
                    "\x1b[36m%s\x1b[0m",
                    "\nParking B (types: medium): "
                  );
                  let b_count = 0;
                  for (let i = 0; i < 10; i++) {
                    let space = JSON.stringify(data2[1].Park_B[i].occupied);
                    let type = JSON.stringify(data2[1].Park_B[i].p_type);
                    if (space == '"none"' && type == '"MP"') {
                      console.log(
                        "Slot (" +
                        JSON.stringify(data2[1].Park_B[i].space)
                          .replace('"', " ")
                          .replace('"', " ") +
                        ") -> occupied: " +
                        space
                      );
                      store_B[i] = parseInt(
                        JSON.stringify(data2[1].Park_B[i].space)
                          .replace('"', " ")
                          .replace('"', " "),
                        10
                      );
                      b_count++;
                    }
                  }
                  if (b_count == 0) {
                    console.log(
                      "Sorry, there is no available slot for now in this parking area!"
                    );
                  }

                  // Parking C

                  console.log(
                    "\x1b[36m%s\x1b[0m",
                    "\nParking C (types: medium): "
                  );
                  let c_count = 0;
                  for (let i = 0; i < 10; i++) {
                    let space = JSON.stringify(data2[2].Park_C[i].occupied);
                    let type = JSON.stringify(data2[2].Park_C[i].p_type);

                    if (space == '"none"' && type == '"MP"') {
                      console.log(
                        "Slot (" +
                        JSON.stringify(data2[2].Park_C[i].space)
                          .replace('"', " ")
                          .replace('"', " ") +
                        ") -> occupied: " +
                        space
                      );
                      store_C[i] = parseInt(
                        JSON.stringify(data2[2].Park_C[i].space)
                          .replace('"', " ")
                          .replace('"', " "),
                        10
                      );
                      c_count++;
                    }
                  }

                  //Display Error Messages
                  if (c_count == 0) {
                    console.log(
                      "Sorry, there is no available slot for now in this parking area!"
                    );
                  }

                  //Display Choose slot information
                  rl.question("\nChoose slot(ex: A-1): ", function (c_slot) {
                    const array = c_slot.split("-");

                    try {
                      rl.question(
                        "Name of the vehicle's owner: ",
                        function (name) {
                          let check_process = false;
                          if (
                            array[0].toLowerCase() == "a" &&
                            store_A.includes(parseInt(array[1], 10))
                          ) {
                            data2[0].Park_A[array[1] - 1].occupied = "yes";
                            fs.writeFileSync(
                              "./data/parking_slot.json",
                              JSON.stringify(data2, null, 4)
                            );
                            check_process = true;
                          } else if (
                            array[0].toLowerCase() == "b" &&
                            store_B.includes(parseInt(array[1], 10))
                          ) {
                            data2[1].Park_B[array[1] - 1].occupied = "yes";
                            fs.writeFileSync(
                              "./data/parking_slot.json",
                              JSON.stringify(data2, null, 4)
                            );
                            check_process = true;
                          } else if (
                            array[0].toLowerCase() == "c" &&
                            store_C.includes(parseInt(array[1], 10))
                          ) {
                            data2[2].Park_C[array[1] - 1].occupied = "yes";
                            fs.writeFileSync(
                              "./data/parking_slot.json",
                              JSON.stringify(data2, null, 4)
                            );
                            check_process = true;
                          } else {
                            console.log("Action failed, please try again!");
                          }
                          if (check_process) {
                            console.log("vehicle successfully parked!");
                            var jsonObject = [
                              {
                                park: array[0].toUpperCase(),
                                space: parseInt(array[1], 10),
                                name: name,
                                v_size: size,
                                p_type: "MP",
                                date: fullDate(new Date())
                              },
                            ];
                            data = require("./data/owner.json");
                            let combineData = JSON.stringify(
                              data.concat(jsonObject),
                              null,
                              4
                            );
                            fs.writeFileSync("./data/owner.json", combineData);
                            delete require.cache[
                              require.resolve("./data/owner.json")
                            ];
                            data = require("./data/owner.json");
                          }
                          delete require.cache[
                            require.resolve("./data/parking_slot.json")
                          ];
                          data2 = require("./data/parking_slot.json");
                        }
                      );
                    } catch (e) {
                      console.log(e.message);
                    }
                  });
                } else if (slot == 2) {
                  console.log(
                    "\x1b[36m%s\x1b[0m",
                    "Parking A (types: large): "
                  );
                  let a_count = 0;
                  for (let i = 0; i < 10; i++) {
                    let space = JSON.stringify(data2[0].Park_A[i].occupied);
                    let type = JSON.stringify(data2[0].Park_A[i].p_type);
                    if (space == '"none"' && type == '"LP"') {
                      console.log(
                        "Slot (" +
                        JSON.stringify(data2[0].Park_A[i].space)
                          .replace('"', " ")
                          .replace('"', " ") +
                        ") -> occupied: " +
                        space
                      );
                      store_A[i] = parseInt(
                        JSON.stringify(data2[0].Park_A[i].space)
                          .replace('"', " ")
                          .replace('"', " "),
                        10
                      );
                      a_count++;
                    }
                  }

                  //Display Error Messages
                  if (a_count == 0) {
                    console.log(
                      "Sorry, there is no available slot for now in this parking area!"
                    );
                  }
                  // Parking B
                  console.log(
                    "\x1b[36m%s\x1b[0m",
                    "\nParking B (types: large): "
                  );
                  let b_count = 0;
                  for (let i = 0; i < 10; i++) {
                    let space = JSON.stringify(data2[1].Park_B[i].occupied);
                    let type = JSON.stringify(data2[1].Park_B[i].p_type);
                    if (space == '"none"' && type == '"LP"') {
                      console.log(
                        "Slot (" +
                        JSON.stringify(data2[1].Park_B[i].space)
                          .replace('"', " ")
                          .replace('"', " ") +
                        ") -> occupied: " +
                        space
                      );
                      store_B[i] = parseInt(
                        JSON.stringify(data2[1].Park_B[i].space)
                          .replace('"', " ")
                          .replace('"', " "),
                        10
                      );
                      b_count++;
                    }
                  }

                  //Display Error Messages
                  if (b_count == 0) {
                    console.log(
                      "Sorry, there is no available slot for now in this parking area!"
                    );
                  }
                  // Parking C

                  console.log(
                    "\x1b[36m%s\x1b[0m",
                    "\nParking C (types: large): "
                  );
                  let c_count = 0;
                  for (let i = 0; i < 10; i++) {
                    let space = JSON.stringify(data2[2].Park_C[i].occupied);
                    let type = JSON.stringify(data2[2].Park_C[i].p_type);

                    if (space == '"none"' && type == '"LP"') {
                      console.log(
                        "Slot (" +
                        JSON.stringify(data2[2].Park_C[i].space)
                          .replace('"', " ")
                          .replace('"', " ") +
                        ") -> occupied: " +
                        space
                      );
                      store_C[i] = parseInt(
                        JSON.stringify(data2[2].Park_C[i].space)
                          .replace('"', " ")
                          .replace('"', " "),
                        10
                      );
                      c_count++;
                    }
                  }

                  //Display Error Messages
                  if (c_count == 0) {
                    console.log(
                      "Sorry, there is no available slot for now in this parking area!"
                    );
                  }

                  rl.question("\nChoose slot(ex: A-1): ", function (c_slot) {
                    const array = c_slot.split("-");

                    try {
                      rl.question(
                        "Name of the vehicle's owner: ",
                        function (name) {
                          let check_process = false;
                          if (
                            array[0].toLowerCase() == "a" &&
                            store_A.includes(parseInt(array[1], 10))
                          ) {
                            data2[0].Park_A[array[1] - 1].occupied = "yes";
                            fs.writeFileSync(
                              "./data/parking_slot.json",
                              JSON.stringify(data2, null, 4)
                            );
                            check_process = true;
                          } else if (
                            array[0].toLowerCase() == "b" &&
                            store_B.includes(parseInt(array[1], 10))
                          ) {
                            data2[1].Park_B[array[1] - 1].occupied = "yes";
                            fs.writeFileSync(
                              "./data/parking_slot.json",
                              JSON.stringify(data2, null, 4)
                            );
                            check_process = true;
                          } else if (
                            array[0].toLowerCase() == "c" &&
                            store_C.includes(parseInt(array[1], 10))
                          ) {
                            data2[2].Park_C[array[1] - 1].occupied = "yes";
                            fs.writeFileSync(
                              "./data/parking_slot.json",
                              JSON.stringify(data2, null, 4)
                            );
                            check_process = true;
                          } else {
                            console.log("Action failed, please try again!");
                          }
                          if (check_process) {
                            console.log("vehicle successfully parked!");
                            var jsonObject = [
                              {
                                park: array[0].toUpperCase(),
                                space: parseInt(array[1], 10),
                                name: name,
                                v_size: size,
                                p_type: "LP",
                                date: fullDate(new Date())
                              },
                            ];

                            let combineData = JSON.stringify(
                              data.concat(jsonObject),
                              null,
                              4
                            );
                            fs.writeFileSync("./data/owner.json", combineData);
                            delete require.cache[
                              require.resolve("./data/owner.json")
                            ];
                            data = require("./data/owner.json");
                          }
                          delete require.cache[
                            require.resolve("./data/parking_slot.json")
                          ];
                          data2 = require("./data/parking_slot.json");
                        }
                      );
                    } catch (e) {
                      console.log(e.message);
                    }
                  });
                }
              });
              break;
            case "2":
              rl.question("Available Slot [ 2-LP ]: ", function (slot) {
                const store_A = new Array();
                const store_B = new Array();
                const store_C = new Array();
                if (slot == 2) {
                  console.log(
                    "\x1b[36m%s\x1b[0m",
                    "Parking A (types: large): "
                  );
                  let a_count = 0;
                  for (let i = 0; i < 10; i++) {
                    let space = JSON.stringify(data2[0].Park_A[i].occupied);
                    let type = JSON.stringify(data2[0].Park_A[i].p_type);
                    if (space == '"none"' && type == '"LP"') {
                      console.log(
                        "Slot (" +
                        JSON.stringify(data2[0].Park_A[i].space)
                          .replace('"', " ")
                          .replace('"', " ") +
                        ") -> occupied: " +
                        space
                      );
                      store_A[i] = parseInt(
                        JSON.stringify(data2[0].Park_A[i].space)
                          .replace('"', " ")
                          .replace('"', " "),
                        10
                      );
                      a_count++;
                    }
                  }

                  //Display Error Messages
                  if (a_count == 0) {
                    console.log(
                      "Sorry, there is no available slot for now in this parking area!"
                    );
                  }
                  // Parking B
                  console.log(
                    "\x1b[36m%s\x1b[0m",
                    "\nParking B (types: large): "
                  );
                  let b_count = 0;
                  for (let i = 0; i < 10; i++) {
                    let space = JSON.stringify(data2[1].Park_B[i].occupied);
                    let type = JSON.stringify(data2[1].Park_B[i].p_type);
                    if (space == '"none"' && type == '"LP"') {
                      console.log(
                        "Slot (" +
                        JSON.stringify(data2[1].Park_B[i].space)
                          .replace('"', " ")
                          .replace('"', " ") +
                        ") -> occupied: " +
                        space
                      );
                      store_B[i] = parseInt(
                        JSON.stringify(data2[1].Park_B[i].space)
                          .replace('"', " ")
                          .replace('"', " "),
                        10
                      );
                      b_count++;
                    }
                  }

                  //Display Error Messages
                  if (b_count == 0) {
                    console.log(
                      "Sorry, there is no available slot for now in this parking area!"
                    );
                  }
                  // Parking C

                  console.log(
                    "\x1b[36m%s\x1b[0m",
                    "\nParking C (types: large): "
                  );
                  let c_count = 0;
                  for (let i = 0; i < 10; i++) {
                    let space = JSON.stringify(data2[2].Park_C[i].occupied);
                    let type = JSON.stringify(data2[2].Park_C[i].p_type);

                    if (space == '"none"' && type == '"LP"') {
                      console.log(
                        "Slot (" +
                        JSON.stringify(data2[2].Park_C[i].space)
                          .replace('"', " ")
                          .replace('"', " ") +
                        ") -> occupied: " +
                        space
                      );
                      store_C[i] = parseInt(
                        JSON.stringify(data2[2].Park_C[i].space)
                          .replace('"', " ")
                          .replace('"', " "),
                        10
                      );
                      c_count++;
                    }
                  }
                  //Display Error Messages
                  if (c_count == 0) {
                    console.log(
                      "Sorry, there is no available slot for now in this parking area!"
                    );
                  }

                  rl.question("\nChoose slot(ex: A-1): ", function (c_slot) {
                    const array = c_slot.split("-");

                    try {
                      rl.question(
                        "Name of the vehicle's owner: ",
                        function (name) {
                          let check_process = false;
                          if (
                            array[0].toLowerCase() == "a" &&
                            store_A.includes(parseInt(array[1], 10))
                          ) {
                            data2[0].Park_A[array[1] - 1].occupied = "yes";
                            fs.writeFileSync(
                              "./data/parking_slot.json",
                              JSON.stringify(data2, null, 4)
                            );
                            check_process = true;
                          } else if (
                            array[0].toLowerCase() == "b" &&
                            store_B.includes(parseInt(array[1], 10))
                          ) {
                            data2[1].Park_B[array[1] - 1].occupied = "yes";
                            fs.writeFileSync(
                              "./data/parking_slot.json",
                              JSON.stringify(data2, null, 4)
                            );
                            check_process = true;
                          } else if (
                            array[0].toLowerCase() == "c" &&
                            store_C.includes(parseInt(array[1], 10))
                          ) {
                            data2[2].Park_C[array[1] - 1].occupied = "yes";
                            fs.writeFileSync(
                              "./data/parking_slot.json",
                              JSON.stringify(data2, null, 4)
                            );
                            check_process = true;
                          } else {
                            console.log("Action failed, please try again!");
                          }
                          if (check_process) {
                            console.log("vehicle successfully parked!");
                            var jsonObject = [
                              {
                                park: array[0].toUpperCase(),
                                space: parseInt(array[1], 10),
                                name: name,
                                v_size: size,
                                p_type: "LP",
                                date: fullDate(new Date())
                              },
                            ];

                            let combineData = JSON.stringify(
                              data.concat(jsonObject),
                              null,
                              4
                            );
                            fs.writeFileSync("./data/owner.json", combineData);
                            delete require.cache[
                              require.resolve("./data/owner.json")
                            ];
                            data = require("./data/owner.json");
                          }
                          delete require.cache[
                            require.resolve("./data/parking_slot.json")
                          ];
                          data2 = require("./data/parking_slot.json");
                        }
                      );
                    } catch (e) {
                      console.log(e.message);
                    }
                  });
                }
              });
              break;
            default:
              break;
          }
        }
      );

      break;

    //Display to Locate Vehicle to unpark
    case "u":
      rl.question(
        "Locate the vehicle to unpark. [Parking Area - row column | ex:A - 1 5]: ",
        function (loc) {
          try {
            let strloc = loc.split("-");


            let loc_index = strloc[1].trim().split(" ");
            delete require.cache[require.resolve("./data/parking_slot.json")];
            delete require.cache[require.resolve("./data/owner.json")];
            data = require("./data/owner.json");
            data2 = require("./data/parking_slot.json");

            if (strloc[0].trim().toUpperCase() == "A") {

              const row = data2[0].Park_A[loc_index[1] - 1].row;
              const column = data2[0].Park_A[loc_index[1] - 1].col;
              let occupy = data2[0].Park_A[loc_index[1] - 1].occupied;
         
              if (Number(row) == loc_index[0] && occupy == "yes") {

                console.log("Entire payments shown below: \n");

                data2[0].Park_A[loc_index[1] - 1].occupied = "none";

                for (let i = 0; i < data.length; i++) {
                  if (data[i].park.toUpperCase() == "A" && data[i].space == column) {

                    console.log("Owner: " + data[i].name);
                    // Show vehicle size
                    if (data[i].v_size == "0") {
                      console.log("Vehicle Size: Small");
                    } else if (data[i].v_size == "1") {
                      console.log("Vehicle Size: Medium");
                    }
                    else if (data[i].v_size == "2") {
                      console.log("Vehicle Size: Large");
                    }
                    // Show parking type
                    let p_type = null;
                    if (data[i].p_type == "SP") {
                      console.log("Parking Type: Small (SP)");
                      p_type = "SP";
                    } else if (data[i].p_type == "MP") {
                      console.log("Parking Type: Medium (MP)");
                      p_type = "MP";
                    }
                    else if (data[i].p_type == "LP") {
                      console.log("Parking Type: Large (LP)");
                      p_type = "LP";
                    }

                    console.log("Parking Area: A");
                    console.log(`Space: ${column}`);
                    console.log(`Location: ( row: ${row}, column: ${column} )`);
                    console.log(`Date: ${data[i].date}`);

                    let hours = Math.round(diff_hours(parseDate(new Date()), parseDate(new Date(data[i].date))));
                    let payments = 0;
                    console.log("Total hours: " + diff_hours(parseDate(new Date()), parseDate(new Date(data[i].date))).toFixed(2) + "hr/s");

                    console.log("\n--------------------------------------")
                    console.log("Total Payments:\n");
                    if (hours <= 3) {
                      // payments for the for the first 3 hours charge to 40 pesos
                      payments += 40;
                      console.log("     Initial charges (First 3 hours): " + payments);
                    }
                    else if (hours > 3 && hours <= 24) {
                      // payments for the for the first 3 hours charge to 40 pesos
                      payments += 40;
                      console.log("     Intial charges (First 3 hours): " + payments + " peso/s");

                      // another charges beyond the initial 3 hours

                      if (p_type == "SP") {
                        payments += hours * 20;
                        console.log("     Park-type(SP) charges (+20 pesos/hr): " + hours * 20 + " peso/s");

                      }
                      else if (p_type == "MP") {

                        payments += hours * 60;
                        console.log("     Park-type(MP) charges (+60 pesos/hr): " + hours * 60 + " peso/s");
                      }
                      else if (p_type == "LP") {

                        payments += hours * 100;
                        console.log("     Park-type(LP) charges (+100 pesos/hr): " + hours * 100 + " peso/s");
                      }
                    }
                    else if (hours > 24) {
                      // payments for the for the first 3 hours charge to 40 pesos
                      payments += 40;
                      let remainTime = parseInt(hours % 24);
                      payments += 5000 * parseInt(hours / 24);


                      console.log("     Initial charges (First 3 hours): " + 40 + " peso/s");
                      console.log("     full 24hours charges (+5000 pesos/24hr): " + 5000 * parseInt(hours / 24) + " peso/s");



                      //Calculation of Charges 
                      if (p_type == "SP") {
                        payments += remainTime * 20;
                        console.log("     Park-type(SP) charges (+20 pesos/hr): " + remainTime * 20 + " peso/s");

                      }
                      else if (p_type == "MP") {

                        payments += remainTime * 60;
                        console.log("     Park-type(MP) charges (+60 pesos/hr): " + remainTime * 60 + " peso/s");
                      }
                      else if (p_type == "LP") {

                        payments += remainTime * 100;
                        console.log("     Park-type(LP) charges (+100 pesos/hr): " + remainTime * 100 + " peso/s");
                      }
                    }

                    //Display total charges
                    console.log("     Overall Total: " + payments + " peso/s");
                    console.log("\n--------------------------------------")

                    rl.question(
                      "Unpark? [Yes or No]: ",
                      function (c) {

                        if (c.toLowerCase() == "yes") {
                          console.log("vehicle unpark sucessfully!");
                          data.splice(i, 1);
                          fs.writeFileSync(
                            "./data/owner.json",
                            JSON.stringify(data, null, 4)
                          );
                          fs.writeFileSync(
                            "./data/parking_slot.json",
                            JSON.stringify(data2, null, 4)
                          );
                        } else if (c.toLowerCase() == "no") {
                          // go back
                        }
                        else {
                          console.log("Invalid type occurred!");
                        }


                      });


                  }

                }
              }
              else {
                console.log("Action failed, please try again! ");
              }
            }
            if (strloc[0].trim().toUpperCase() == "B") {

              const row = data2[1].Park_B[loc_index[1] - 1].row;
              const column = data2[1].Park_B[loc_index[1] - 1].col;
              let occupy = data2[1].Park_B[loc_index[1] - 1].occupied;
              // console.log(occupy);
              if (Number(row) == loc_index[0] && occupy == "yes") {

                console.log("Entire payments shown below: \n");

                data2[1].Park_B[loc_index[1] - 1].occupied = "none";

                for (let i = 0; i < data.length; i++) {
                  if (data[i].park.toUpperCase() == "B" && data[i].space == column) {

                    console.log("Owner: " + data[i].name);
                    // Show vehicle size
                    if (data[i].v_size == "0") {
                      console.log("Vehicle Size: Small");
                    } else if (data[i].v_size == "1") {
                      console.log("Vehicle Size: Medium");
                    }
                    else if (data[i].v_size == "2") {
                      console.log("Vehicle Size: Large");
                    }
                    // Show parking type
                    let p_type = null;
                    if (data[i].p_type == "SP") {
                      console.log("Parking Type: Small (SP)");
                      p_type = "SP";
                    } else if (data[i].p_type == "MP") {
                      console.log("Parking Type: Medium (MP)");
                      p_type = "MP";
                    }
                    else if (data[i].p_type == "LP") {
                      console.log("Parking Type: Large (LP)");
                      p_type = "LP";
                    }

                    console.log("Parking Area: B");
                    console.log(`Space: ${column}`);
                    console.log(`Location: ( row: ${row}, column: ${column} )`);
                    console.log(`Date: ${data[i].date}`);

                    let hours = Math.round(diff_hours(parseDate(new Date()), parseDate(new Date(data[i].date))));
                    let payments = 0;
                    console.log("Total hours: " + diff_hours(parseDate(new Date()), parseDate(new Date(data[i].date))).toFixed(2) + "hr/s");


                    // console.log(p_type);
                    console.log("\n--------------------------------------")
                    console.log("Total Payments:\n");
                    if (hours <= 3) {
                      // payments for the for the first 3 hours charge to 40 pesos
                      payments += 40;
                      console.log("     Initial charges (First 3 hours): " + payments);
                    }
                    else if (hours > 3 && hours <= 24) {
                      // payments for the for the first 3 hours charge to 40 pesos
                      payments += 40;
                      console.log("     Intial charges (First 3 hours): " + payments + " peso/s");

                      // another charges beyond the initial 3 hours

                      if (p_type == "SP") {
                        payments += hours * 20;
                        console.log("     Park-type(SP) charges (+20 pesos/hr): " + hours * 20 + " peso/s");

                      }
                      else if (p_type == "MP") {

                        payments += hours * 60;
                        console.log("     Park-type(MP) charges (+60 pesos/hr): " + hours * 60 + " peso/s");
                      }
                      else if (p_type == "LP") {

                        payments += hours * 100;
                        console.log("     Park-type(LP) charges (+100 pesos/hr): " + hours * 100 + " peso/s");
                      }
                    }
                    else if (hours > 24) {
                      // payments for the for the first 3 hours charge to 40 pesos
                      payments += 40;
                      let remainTime = parseInt(hours % 24);
                      payments += 5000 * parseInt(hours / 24);


                      console.log("     Initial charges (First 3 hours): " + 40 + " peso/s");
                      console.log("     full 24hours charges (+5000 pesos/24hr): " + 5000 * parseInt(hours / 24) + " peso/s");




                      if (p_type == "SP") {
                        payments += remainTime * 20;
                        console.log("     Park-type(SP) charges (+20 pesos/hr): " + remainTime * 20 + " peso/s");

                      }
                      else if (p_type == "MP") {

                        payments += remainTime * 60;
                        console.log("     Park-type(MP) charges (+60 pesos/hr): " + remainTime * 60 + " peso/s");
                      }
                      else if (p_type == "LP") {

                        payments += remainTime * 100;
                        console.log("     Park-type(LP) charges (+100 pesos/hr): " + remainTime * 100 + " peso/s");
                      }
                    }

                    console.log("     Overall Total: " + payments + " peso/s");
                    console.log("\n--------------------------------------")

                    rl.question(
                      "Unpark? [Yes or No]: ",
                      function (c) {

                        if (c.toLowerCase() == "yes") {
                          console.log("vehicle unpark sucessfully!");
                          data.splice(i, 1);
                          fs.writeFileSync(
                            "./data/owner.json",
                            JSON.stringify(data, null, 4)
                          );
                          fs.writeFileSync(
                            "./data/parking_slot.json",
                            JSON.stringify(data2, null, 4)
                          );
                        } else if (c.toLowerCase() == "no") {
                          // go back
                        }
                        else {
                          console.log("Invalid type occurred!");
                        }


                      });


                  }

                }
              }
              else {
                console.log("Action failed, please try again! ");
              }
            }
            if (strloc[0].trim().toUpperCase() == "C") {

              const row = data2[2].Park_C[loc_index[1] - 1].row;
              const column = data2[2].Park_C[loc_index[1] - 1].col;
              let occupy = data2[2].Park_C[loc_index[1] - 1].occupied;
              // console.log(occupy);
              if (Number(row) == loc_index[0] && occupy == "yes") {

                console.log("Entire payments shown below: \n");

                data2[2].Park_C[loc_index[1] - 1].occupied = "none";

                for (let i = 0; i < data.length; i++) {
                  if (data[i].park.toUpperCase() == "C" && data[i].space == column) {

                    console.log("Owner: " + data[i].name);

                    // Show vehicle size
                    if (data[i].v_size == "0") {
                      console.log("Vehicle Size: Small");
                    } else if (data[i].v_size == "1") {
                      console.log("Vehicle Size: Medium");
                    }
                    else if (data[i].v_size == "2") {
                      console.log("Vehicle Size: Large");
                    }
                    // Show parking type
                    let p_type = null;
                    if (data[i].p_type == "SP") {
                      console.log("Parking Type: Small (SP)");
                      p_type = "SP";
                    } else if (data[i].p_type == "MP") {
                      console.log("Parking Type: Medium (MP)");
                      p_type = "MP";
                    }
                    else if (data[i].p_type == "LP") {
                      console.log("Parking Type: Large (LP)");
                      p_type = "LP";
                    }

                    console.log("Parking Area: C");
                    console.log(`Space: ${column}`);
                    console.log(`Location: ( row: ${row}, column: ${column} )`);
                    console.log(`Date: ${data[i].date}`);

                    let hours = Math.round(diff_hours(parseDate(new Date()), parseDate(new Date(data[i].date))));
                    let payments = 0;
                    console.log("Total hours: " + diff_hours(parseDate(new Date()), parseDate(new Date(data[i].date))).toFixed(2) + "hr/s");


                    // console.log(p_type);
                    console.log("\n--------------------------------------")
                    console.log("Total Payments:\n");
                    if (hours <= 3) {

                      // payments for the for the first 3 hours charge to 40 pesos

                      payments += 40;
                      console.log("     Initial charges (First 3 hours): " + payments);
                    }
                    else if (hours > 3 && hours <= 24) {

                      // payments for the for the first 3 hours charge to 40 pesos
                      payments += 40;
                      console.log("     Intial charges (First 3 hours): " + payments + " peso/s");

                      // another charges beyond the initial 3 hours

                      if (p_type == "SP") {
                        payments += hours * 20;
                        console.log("     Park-type(SP) charges (+20 pesos/hr): " + hours * 20 + " peso/s");

                      }
                      else if (p_type == "MP") {

                        payments += hours * 60;
                        console.log("     Park-type(MP) charges (+60 pesos/hr): " + hours * 60 + " peso/s");
                      }
                      else if (p_type == "LP") {

                        payments += hours * 100;
                        console.log("     Park-type(LP) charges (+100 pesos/hr): " + hours * 100 + " peso/s");
                      }
                    }
                    else if (hours > 24) {

                      // payments for the for the first 3 hours charge to 40 pesos

                      payments += 40;
                      let remainTime = parseInt(hours % 24);
                      payments += 5000 * parseInt(hours / 24);


                      console.log("     Initial charges (First 3 hours): " + 40 + " peso/s");
                      console.log("     full 24hours charges (+5000 pesos/24hr): " + 5000 * parseInt(hours / 24) + " peso/s");




                      if (p_type == "SP") {
                        payments += remainTime * 20;
                        console.log("     Park-type(SP) charges (+20 pesos/hr): " + remainTime * 20 + " peso/s");

                      }
                      else if (p_type == "MP") {

                        payments += remainTime * 60;
                        console.log("     Park-type(MP) charges (+60 pesos/hr): " + remainTime * 60 + " peso/s");
                      }
                      else if (p_type == "LP") {

                        payments += remainTime * 100;
                        console.log("     Park-type(LP) charges (+100 pesos/hr): " + remainTime * 100 + " peso/s");
                      }
                    }

                    console.log("     Overall Total: " + payments + " peso/s");
                    console.log("\n--------------------------------------")

                    rl.question(
                      "Unpark? [Yes or No]: ",
                      function (c) {

                        if (c.toLowerCase() == "yes") {
                          console.log("vehicle unpark sucessfully!");
                          data.splice(i, 1);
                          fs.writeFileSync(
                            "./data/owner.json",
                            JSON.stringify(data, null, 4)
                          );
                          fs.writeFileSync(
                            "./data/parking_slot.json",
                            JSON.stringify(data2, null, 4)
                          );
                        } else if (c.toLowerCase() == "no") {
                          // go back
                        }
                        else {
                          console.log("Invalid type occurred!");
                        }


                      });


                  }

                }
              }
              else {
                console.log("Action failed, please try again! ");
              }
            }

          }
          catch (err) {
            console.log("Action failed, please try again! " + err.message);
          }

        }
      );
      break;
    case "m":
      delete require.cache[require.resolve("./data/parking_slot.json")];
      data = require("./data/parking_slot.json");
      console.log(
        util.inspect(data2, {
          showHidden: false,
          colors: true,
          compact: true,
          depth: null,
        })
      );

      break;
    default:
      break;
  }
  rl.prompt();
}).on("close", () => {
  console.log(
    "\nThank you! We are happy to serve you. from XYZ Parking System!"
  );
  process.exit(0);
});
