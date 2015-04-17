var Quad = jQuery.Quad;

QUnit.test( "Row", function( assert ) {
  assert.ok(Quad.Row() == null, "Row() == null" );
  assert.ok(Quad.Row(0) == null, "Row(0) == null" );
  assert.ok(Quad.Row(-1) == null, "Row(-1) == null" );
  assert.ok(Quad.Row('A') == null, "Row('A') == null" );
  assert.ok(Quad.Row(Number.MAX_SAFE_INTEGER + 1) == null, "Row(MAX_SAFE_INTEGER + 1) == null");

  assert.ok(Quad.Row(1) instanceof Quad.Row, "Row(1) instanceof Row" );
  assert.ok(Quad.Row('1') instanceof Quad.Row, "Row('1') instanceof Row" );
  assert.ok(Quad.Row(Number.MAX_SAFE_INTEGER) instanceof Quad.Row, "Row(MAX_SAFE_INTEGER) instanceof Row");
});


QUnit.test( "Row.number", function( assert ) {
  assert.ok(Quad.Row(1).number == 1, "Row(1).number == 1");
  assert.ok(Quad.Row('1').number == 1, "Row('1').number == 1");
  assert.ok(Quad.Row(2).number == 2, "Row(2).number == 2");
  assert.ok(Quad.Row(Number.MAX_SAFE_INTEGER).number == Number.MAX_SAFE_INTEGER, "Row(MAX_SAFE_INTEGER).number == MAX_SAFE_INTEGER")
});


QUnit.test( "Row.string", function( assert ) {
  assert.ok(Quad.Row(1).number == '1', "Row(1).number == '1'");
  assert.ok(Quad.Row('1').number == '1', "Row('1').number == '1'");
  assert.ok(Quad.Row(2).number == '2', "Row(2).number == '2'");
  assert.ok(Quad.Row(Number.MAX_SAFE_INTEGER).number == (Number.MAX_SAFE_INTEGER + ''), "Row(MAX_SAFE_INTEGER).number == MAX_SAFE_INTEGER")
});

QUnit.test( "Row.increment", function( assert ) {
  assert.ok(Quad.Row(1).increment(0).number == 1, "Row(1).increment(0).number == 1");
  assert.ok(Quad.Row(1).increment(1).number == 2, "Row(1).increment(1).number == 2");
  assert.ok(Quad.Row(2).increment(-1).number == 1, "Row(2).increment(-1) == 1");
  assert.ok(Quad.Row(1).increment(-1) == null, "Row('1').increment(-1) == null");
});


QUnit.test( "Row.compare", function( assert ) {
  assert.ok(Quad.Row(5).compare(Quad.Row(2)) > 0, "Row(5).compare(Row(2)) > 0");
  assert.ok(Quad.Row(5).compare(Quad.Row(5)) == 0, "Row(5).compare(Row(5)) == 0");
  assert.ok(Quad.Row(5).compare(Quad.Row(7)) < 0, "Row(5).compare(Row(7)) < 0");
  assert.ok(Quad.Row(5).compare(Quad.Row(0)) == undefined, "Row(5).compare(Row(0)) == undefined");

  assert.ok(Quad.Row(Number.MAX_SAFE_INTEGER).compare(Quad.Row(5)) > 0, "Row(MAX_SAFE_INTEGER).compare(Row(5)) > 0");
  assert.ok(Quad.Row(5).compare(Quad.Row(Number.MAX_SAFE_INTEGER)) < 0, "Row(5).compare(Row(MAX_SAFE_INTEGER)) < 0");
  assert.ok(Quad.Row(Number.MAX_SAFE_INTEGER).compare(Quad.Row(Number.MAX_SAFE_INTEGER)) == 0, "Row(MAX_SAFE_INTEGER).compare(Row(MAX_SAFE_INTEGER)) == 0");
});

QUnit.test( "Row.hasCell", function( assert ) {
  assert.ok(Quad.Row(1).hasCell(Quad.Cell('A1')), "Row(1).hasCell(Quad.Cell('A1'))");
  assert.ok(Quad.Row(1).hasCell('A1'), "Row(1).hasCell('A1')");
  assert.ok(!Quad.Row(2).hasCell('A1'), "!Row(2).hasCell('A1')");
});

QUnit.test( "Row.cellsInRange", function( assert ) {
  assert.ok(Quad.Row(1).cellsInRange('A2:B3').strarray().length == 0, "Row(4).cellsInRange('A2:B3').length == 0");

  var cellstrar = Quad.Row(2).cellsInRange('A2:B3').strarray();

  assert.ok(cellstrar.length == 2, "Row(2).cellsInRange('A2:B3').length == 2");
  assert.ok(~cellstrar.indexOf('A2') && ~cellstrar.indexOf('B2'), "Row(2).cellsInRange('A2:B3') ~= ['A2', 'B2']");

  cellstrar = Quad.Row(3).cellsInRange('A2:B3').strarray();

  assert.ok(cellstrar.length == 2, "Row(3).cellsInRange('A2:B3').length == 2");
  assert.ok(~cellstrar.indexOf('A3') && ~cellstrar.indexOf('B3'), "Row(3).cellsInRange('A2:B3') ~= ['A3', 'B3']");


  assert.ok(Quad.Row(4).cellsInRange('A2:B3').strarray().length == 0, "Row(4).cellsInRange('A2:B3').length == 0");
});


QUnit.test( "Column", function( assert ) {
  assert.ok(Quad.Column() == null, 'Column() == null');

  assert.ok(Quad.Column('') == null, "Column('') == null");

  assert.ok(Quad.Column('A') instanceof Quad.Column , "Column('A') instanceof Column");
  assert.ok(Quad.Column('a') instanceof Quad.Column , "Column('a') instanceof Column");
  assert.ok(Quad.Column('AA') instanceof Quad.Column , "Column('A') instanceof Column");
  assert.ok(Quad.Column(1) instanceof Quad.Column, "Column(1) instanceof Column");
  assert.ok(Quad.Column('1') instanceof Quad.Column, "Column('1') instanceof Column");

  assert.throws(function() { new Quad.Column('A') }, "new Column('A') throws error");
});


QUnit.test("Column.number", function(assert) {
  assert.ok(Quad.Column('A').number == 1, "Column('A').number == 1");
  assert.ok(Quad.Column('a').number == 1, "Column('a').number == 1");
  assert.ok(Quad.Column('Z').number == 26, "Column('Z').number == 26");
  assert.ok(Quad.Column('AA').number == 27, "Column('AA').number == 27");
  assert.ok(Quad.Column(1).number == 1, "Column(1).number == 1");
  assert.ok(Quad.Column('1').number == 1, "Column('1').number == 1");
  assert.ok(Quad.Column(27).number == 27, "Column(27).number == 27");
  assert.ok(Quad.Column('27').number == 27, "Column('27').number == 27");
});

QUnit.test("Column.string", function(assert) {
  assert.ok(Quad.Column('A').string == 'A', "Column('A').string == 'A'");
  assert.ok(Quad.Column('a').string == 'A', "Column('a').string == 'A'");
  assert.ok(Quad.Column('Z').string == 'Z', "Column('Z').string == 'Z'");
  assert.ok(Quad.Column('AA').string == 'AA', "Column('AA').string == 'AA'");
  assert.ok(Quad.Column(1).string == 'A', "Column(1).string == 'A'");
  assert.ok(Quad.Column('1').string == 'A', "Column('1').string == 'A'");
  assert.ok(Quad.Column(27).string == 'AA', "Column(27).string == 'AA'");
  assert.ok(Quad.Column('27').string == 'AA', "Column('27').string == 'AA'");
});

QUnit.test("Column.increment", function(assert) {
  assert.ok(Quad.Column('A').increment(0).string == 'A', "Column('A').increment(0) == 'A'");
  assert.ok(Quad.Column('A').increment(1).string == 'B', "Column('B').increment() == 'A'");
  assert.ok(Quad.Column('A').increment(-1) == null, "Column('A').increment(-1) == null");
  assert.ok(Quad.Column('B').increment(-1).string == 'A', "Column('A').increment(-1) == 'A'");
});

QUnit.test("Column.compare", function(assert) {
  assert.ok(Quad.Column('A').compare(Quad.Column('A')) == 0, "Column('A').compare(Column('A')) == 0");
  assert.ok(Quad.Column('B').compare(Quad.Column('A')) > 0, "Column('B').compare(Column('A') > 0");
  assert.ok(Quad.Column('A').compare(Quad.Column('B')) < 0, "Column('A').compare(Column('B') < 0");
  assert.ok(Quad.Column('AA').compare(Quad.Column('A')) > 0, "Column('AA').compare(Column('A') > 0");
  assert.ok(Quad.Column('AB').compare(Quad.Column('AA')) > 0, "Column('AB').compare(Column('AA') > 0");
});


QUnit.test( "Column.hasCell", function( assert ) {
  assert.ok(Quad.Column('A').hasCell(Quad.Cell('A1')), "Column('A').hasCell(Quad.Cell('A1'))");
  assert.ok(Quad.Column('A').hasCell('A1'), "Column('A').hasCell('A1')");
  assert.ok(!Quad.Column('B').hasCell('A1'), "!Column('B').hasCell('A1')");
});


QUnit.test( "Column.cellsInRange", function( assert ) {
  var cellstrar = Quad.Column('A').cellsInRange('A2:B3').strarray();

  assert.ok(cellstrar.length == 2, "Column('A').cellsInRange('A2:B3').length == 2");
  assert.ok(~cellstrar.indexOf('A2') && ~cellstrar.indexOf('A3'), "Column('A').cellsInRange('A2:B3') ~= ['A2', 'A3']");

  cellstrar = Quad.Column('B').cellsInRange('A2:B3').strarray();

  assert.ok(cellstrar.length == 2, "Column('B').cellsInRange('A2:B3').length == 2");
  assert.ok(~cellstrar.indexOf('B2') && ~cellstrar.indexOf('B3'), "Column('B').cellsInRange('A2:B3') ~= ['B2', 'B3']");

  cellstrar = Quad.Column('C').cellsInRange('A2:B3').strarray();

  assert.ok(cellstrar.length == 0, "Column('B').cellsInRange('A2:B3').length == 0");
});

QUnit.test( "Cell", function( assert ) {
  assert.ok(Quad.Cell() == null, 'Cell() == null');
  assert.ok(Quad.Cell("A") == null, 'Cell("A") == null');
  assert.ok(Quad.Cell(1) == null, 'Cell(1) == null');
  assert.ok(Quad.Cell("1A") == null, "Cell('1A') == null");
  assert.ok(Quad.Cell("A1") instanceof Quad.Cell, "Cell('A1') instanceof Cell");
});

QUnit.test("Cell.string", function(assert) {
  assert.ok(Quad.Cell('A7').string == 'A7', "Cell('A7').string == 'A7'");
  assert.ok(Quad.Cell('a7').string == 'A7', "Cell('a7').string == 'A7'");
  assert.ok(Quad.Cell('AK47').string == 'AK47', "Cell('AK47').string == 'AK47'");
});

QUnit.test( "Cell.row", function( assert ) {
  assert.ok(Quad.Cell("A1").row instanceof Quad.Row, " Cell('A1').row instanceof Row");
  assert.ok(Quad.Cell("AK47").row instanceof Quad.Row, "Cell('AK47').row instanceof Row");
  assert.ok(Quad.Cell("A1").row.number == 1, "Cell('A1').row.number == 1");
  assert.ok(Quad.Cell("AK47").row.number == 47, "Cell('AK47').row.number == 47");

});

QUnit.test( "Cell.column", function( assert ) {
  assert.ok(Quad.Cell("A1").column instanceof Quad.Column, " Cell('A1').column instanceof Column");
  assert.ok(Quad.Cell("AK47").column instanceof Quad.Column, "Cell('AK47').column instanceof Column");
  assert.ok(Quad.Cell("A1").column.number == 1, "Cell('A1').column.number == 1");
  assert.ok(Quad.Cell("AK47").column.number == 37, "Cell('AK47').row.number == 37");
});

QUnit.test( "Cell.inColumn", function( assert ) {
  assert.ok(Quad.Cell('A1').inColumn(Quad.Column('A')), "Cell('A1').inColumn(Column(A))");
  assert.ok(Quad.Cell('A1').inColumn('A'), "Cell('A1').inColumn(A)");
  assert.ok(!Quad.Cell('A1').inColumn('B'), "!Cell('A1').inColumn('B')");
});

QUnit.test( "Cell.inRow", function( assert ) {
  assert.ok(Quad.Cell('A1').inRow(Quad.Row(1)), "Cell('A1').inRow(Row(1))");
  assert.ok(Quad.Cell('A1').inRow(1), "Cell('A1').inRow(1)");
  assert.ok(!Quad.Cell('A1').inRow(2), "!Cell('A1').inRow(2)");
});


QUnit.test( "Cell.hasCell", function( assert ) {
  assert.ok(Quad.Cell('A1').hasCell('A1'), "Cell('A1').hasCell('A1')");
  assert.ok(!Quad.Cell('B1').hasCell('A1'), "!Cell('B1').hasCell('A1')");
});

QUnit.test("Cell.increment", function(assert) {
  assert.ok(Quad.Cell('A1').increment(1).string == 'A2', "Cell('A1').increment(1) == 'A2'");
  assert.ok(Quad.Cell('A1').increment(1,0).string == 'A2', "Cell('A1').increment(1,0) == 'A2'");
  assert.ok(Quad.Cell('A1').increment(0,1).string == 'B1', "Cell('A1').increment(1) == 'B1'");
  assert.ok(Quad.Cell('A1').increment(1,1).string == 'B2', "Cell('A1').increment(1,1) == 'B2'");

  assert.ok(Quad.Cell('A1').increment(-1,0) == null, "Cell('A1').increment(-1,0) == null");
  assert.ok(Quad.Cell('A1').increment(0,-1) == null, "Cell('A1').increment(0, -1) == null");
  assert.ok(Quad.Cell('A1').increment(-1,-1) == null, "Cell('A1').increment(-1, -1) == null");

  assert.ok(Quad.Cell('B2').increment(-1).string == 'B1', "Cell('B2').increment(-1) == 'B1'");
  assert.ok(Quad.Cell('B2').increment(-1,0).string == 'B1', "Cell('B2').increment(-1,0) == 'B1'");
  assert.ok(Quad.Cell('B2').increment(0,-1).string == 'A2', "Cell('B2').increment(0, -1) == 'A2'");
  assert.ok(Quad.Cell('B2').increment(-1,-1).string == 'A1', "Cell('A1').increment(-1, -1) == 'A1'");
})

QUnit.test( "Cell.cellsInRange", function( assert ) {
  assert.ok(Quad.Cell('B2').cellsInRange('A1:A1').cardinality == 0, "Cell('B2').cellsInRange('A1:A1').cardinality == 0");
  assert.ok(Quad.Cell('A1').cellsInRange('A1:A1').cardinality == 1, "Cell('B2').cellsInRange('A1:A1').cardinality == 0");
  assert.ok(~Quad.Cell('A1').cellsInRange('A1:A1').strarray().indexOf('A1'), "Cell('A1').cellsInRange('A1:A1').indexOf('A1')");

  assert.ok(Quad.Cell('A1').cellsInRange('A1:B2').cardinality == 1, "Cell('A1').cellsInRange('A1:B2').cardinality == 1");
  assert.ok(~Quad.Cell('A1').cellsInRange('A1:B2').strarray().indexOf('A1'), "Cell('A1').cellsInRange('A1:B2').indexOf('A1')");

  assert.ok(Quad.Cell('B2').cellsInRange('A1:B2').cardinality == 1, "Cell('B2').cellsInRange('A1:B2').cardinality == 1");
  assert.ok(~Quad.Cell('B2').cellsInRange('A1:B2').strarray().indexOf('B2'), "Cell('B2').cellsInRange('A1:B2').indexOf('B2')");
});

QUnit.test( "Range", function( assert ) {
  assert.ok(Quad.Range('A1') == null, "Range('A1') == null");
  assert.ok(Quad.Range() == null, "Range() == null");
  assert.ok(Quad.Range('') == null, "Range('') == null");

  assert.ok(Quad.Range('A1:B22') instanceof Quad.Range, "Range('A1:B22') instanceof Range");
  assert.ok(Quad.Range(Quad.Range('A1:B22')) instanceof Quad.Range, "Range(Range('A1:B22')) instanceof Range");
});

QUnit.test( "Range.width", function( assert ) {
  assert.ok(Quad.Range('A1:B23').width == 2 , "Range('A1:B23').width == 2");
  assert.ok(Quad.Range('A1:A1').width == 1 , "Range('A1:A1').width == 1");
  assert.ok(Quad.Range('B23:A1').width == 2 , "Range('B23:A1').width == 2");
});

QUnit.test( "Range.height", function( assert ) {
  assert.ok(Quad.Range('A1:B23').height == 23 , "Range('A1:B23').height == 23");
  assert.ok(Quad.Range('A1:A1').height == 1 , "Range('A1:A1').height == 1");
  assert.ok(Quad.Range('B23:A1').height == 23 , "Range('B23:A1').height == 23");
});

QUnit.test( "Range.size", function( assert ) {
  assert.ok(Quad.Range('A1:B23').size == 46 , "Range('A1:B23').size == 46");
  assert.ok(Quad.Range('A1:A1').size == 1, "Range('A1:A1').size == 1");
  assert.ok(Quad.Range('B23:A1').size == 46 , "Range('B23:A1').size == 46");
});

QUnit.test("Range.string", function(assert) {
  assert.ok(Quad.Range('A7:B23').string == 'A7:B23', "Range('A7:B23').string == 'A7:B23'");
  assert.ok(Quad.Range('a7:B23').string == 'A7:B23', "Range('a7:B23').string == 'A7:B23'");
  assert.ok(Quad.Range('B23:A7').string == 'B23:A7', "Range('B23:A7').string == 'B23:A7'");
  assert.ok(Quad.Range('Z4:AK47').string == 'Z4:AK47', "Range('Z4:AK47').string == 'Z4:AK47'");
});

QUnit.test( "Range.rightColumn", function( assert ) {
  assert.ok(Quad.Range('A1:B23').rightColumn.string == 'B' , "Range('A1:B23').rightColumn == 'B'");
  assert.ok(Quad.Range('A1:A1').rightColumn.string == 'A' , "Range('A1:A1').rightColumn == 'A'");
  assert.ok(Quad.Range('B23:A1').rightColumn.string == 'B' , "Range('B23:A1').rightColumn == 'B'");
});

QUnit.test( "Range.leftColumn", function( assert ) {
  assert.ok(Quad.Range('A1:B23').leftColumn.string == 'A' , "Range('A1:B23').leftColumn == 'A'");
  assert.ok(Quad.Range('A1:A1').leftColumn.string == 'A' , "Range('A1:A1').leftColumn == 'A'");
  assert.ok(Quad.Range('B23:A1').leftColumn.string == 'A' , "Range('B23:A1').leftColumn == 'A'");
});

QUnit.test( "Range.topRow", function( assert ) {
  assert.ok(Quad.Range('A1:B23').topRow.number == 1 , "Range('A1:B23').topRow == 1");
  assert.ok(Quad.Range('A1:A1').topRow.number == 1 , "Range('A1:A1').topRow == 1");
  assert.ok(Quad.Range('B23:A1').topRow.number == 1 , "Range('B23:A1').topRow == 1");
});

QUnit.test( "Range.bottomRow", function( assert ) {
  assert.ok(Quad.Range('A1:B23').bottomRow.number == 23 , "Range('A1:B23').bottomRow == 23");
  assert.ok(Quad.Range('A1:A1').bottomRow.number == 1 , "Range('A1:A1').bottomRow == 1");
  assert.ok(Quad.Range('B23:A1').bottomRow.number == 23 , "Range('B23:A1').bottomRow == 23");
});

QUnit.test( "Range.hasColumn", function( assert ) {
  assert.ok(Quad.Range('A1:B23').hasColumn('A'), "Range('A1:B23').hasColumn('A')");
  assert.ok(Quad.Range('A1:B23').hasColumn('B'), "Range('A1:B23').hasColumn('B')");
  assert.ok(!Quad.Range('A1:B23').hasColumn('C'), "!Range('A1:B23').hasColumn('C')");

  assert.ok(Quad.Range('A1:A1').hasColumn('A') , "Range('A1:A1').hasColumn('A')");
  assert.ok(!Quad.Range('A1:A1').hasColumn('B') , "!Range('A1:A1').hasColumn('B')");

  assert.ok(Quad.Range('B23:A1').hasColumn('A') , "Range('B23:A1').hasColumn('A')");
  assert.ok(Quad.Range('B23:A1').hasColumn('B') , "Range('B23:A1').hasColumn('B')");
  assert.ok(!Quad.Range('B23:A1').hasColumn('C') , "!Range('B23:A1').hasColumn('C')");
});

QUnit.test( "Range.hasRow", function( assert ) {
  assert.ok(!Quad.Range('A7:B23').hasRow(6), "!Range('A7:B23').hasRow(6)");
  assert.ok(Quad.Range('A7:B23').hasRow(7), "Range('A7:B23').hasRow(7)");
  assert.ok(Quad.Range('A7:B23').hasRow(23), "Range('A7:B23').hasRow(23)");
  assert.ok(!Quad.Range('A7:B23').hasRow(24), "!Range('A7:B23').hasRow(24)");

  assert.ok(!Quad.Range('A7:A7').hasRow(6) , "!Range('A7:A7').hasRow(6)");
  assert.ok(Quad.Range('A7:A7').hasRow(7) , "Range('A7:A7').hasRow(7)");
  assert.ok(!Quad.Range('A7:A7').hasRow(8) , "!Range('A7:A7').hasRow(8)");

  assert.ok(!Quad.Range('B23:A7').hasRow(6) , "Range('B23:A7').hasRow(6)");
  assert.ok(Quad.Range('B23:A7').hasRow(7) , "Range('B23:A7').hasRow(7)");
  assert.ok(Quad.Range('B23:A7').hasRow(23) , "Range('B23:A1').hasRow(23)");
  assert.ok(!Quad.Range('B23:A7').hasRow(24) , "!Range('B23:A1').hasRow(24)");
});


QUnit.test( "Range.hasCell", function( assert ) {
  assert.ok(!Quad.Range('B2:D4').hasCell('A1'), "!Range('B2:D4').hasCell('A1')");
  assert.ok(!Quad.Range('B2:D4').hasCell('B1'), "!Range('B2:D4').hasCell('B1')");
  assert.ok(!Quad.Range('B2:D4').hasCell('C1'), "!Range('B2:D4').hasCell('C1')");
  assert.ok(!Quad.Range('B2:D4').hasCell('D1'), "!Range('B2:D4').hasCell('D1')");
  assert.ok(!Quad.Range('B2:D4').hasCell('E1'), "!Range('B2:D4').hasCell('E1')");

  assert.ok(!Quad.Range('B2:D4').hasCell('A2'), "!Range('B2:D4').hasCell('A2')");
  assert.ok(Quad.Range('B2:D4').hasCell('B2'), "Range('B2:D4').hasCell('B2')");
  assert.ok(Quad.Range('B2:D4').hasCell('C2'), "Range('B2:D4').hasCell('C2')");
  assert.ok(Quad.Range('B2:D4').hasCell('D2'), "Range('B2:D4').hasCell('D2')");
  assert.ok(!Quad.Range('B2:D4').hasCell('E2'), "!Range('B2:D4').hasCell('E2')");


  assert.ok(!Quad.Range('B2:D4').hasCell('A3'), "!Range('B2:D4').hasCell('A3')");
  assert.ok(Quad.Range('B2:D4').hasCell('B3'), "Range('B2:D4').hasCell('B3')");
  assert.ok(Quad.Range('B2:D4').hasCell('C3'), "Range('B2:D4').hasCell('C3')");
  assert.ok(Quad.Range('B2:D4').hasCell('D3'), "Range('B2:D4').hasCell('D3')");
  assert.ok(!Quad.Range('B2:D4').hasCell('E3'), "!Range('B2:D4').hasCell('E3')");

  assert.ok(!Quad.Range('B2:D4').hasCell('A4'), "!Range('B2:D4').hasCell('A4')");
  assert.ok(Quad.Range('B2:D4').hasCell('B4'), "Range('B2:D4').hasCell('B4')");
  assert.ok(Quad.Range('B2:D4').hasCell('C4'), "Range('B2:D4').hasCell('C4')");
  assert.ok(Quad.Range('B2:D4').hasCell('D4'), "Range('B2:D4').hasCell('D4')");
  assert.ok(!Quad.Range('B2:D4').hasCell('E4'), "!Range('B2:D4').hasCell('E4')");

  assert.ok(!Quad.Range('B2:D4').hasCell('A5'), "!Range('B2:D4').hasCell('A5')");
  assert.ok(!Quad.Range('B2:D4').hasCell('B5'), "!Range('B2:D4').hasCell('B5')");
  assert.ok(!Quad.Range('B2:D4').hasCell('C5'), "!Range('B2:D4').hasCell('C5')");
  assert.ok(!Quad.Range('B2:D4').hasCell('D5'), "!Range('B2:D4').hasCell('D5')");
  assert.ok(!Quad.Range('B2:D4').hasCell('E5'), "!Range('B2:D4').hasCell('E5')");
});

QUnit.test( "Range.rows", function( assert ) {
  assert.ok(~Quad.Range('B2:D4').rows.has(2), "Range('B2:D4').rows.has(2)");
  assert.ok(~Quad.Range('B2:D4').rows.has(3), "Range('B2:D4').rows.has(3)");
  assert.ok(~Quad.Range('B2:D4').rows.strarray().indexOf('4'), "Range('B2:D4').rows.strarray().indexOf('4')");
});

QUnit.test( "Range.columns", function( assert ) {
  assert.ok(~Quad.Range('B2:D4').columns.strarray().indexOf('B'), "Range('B2:D4').columns.strarray().indexOf('B')");
  assert.ok(~Quad.Range('B2:D4').columns.strarray().indexOf('C'), "Range('B2:D4').columns.strarray().indexOf('C')");
  assert.ok(~Quad.Range('B2:D4').columns.strarray().indexOf('D'), "Range('B2:D4').columns.strarray().indexOf('D')");
});

QUnit.test( "Range.cells", function( assert ) {
  assert.ok(!~Quad.Range('B2:C4').cells.strarray().indexOf('A1'), "!Range('B2:D4').columns.strarray().indexOf('A1')");
  assert.ok(~Quad.Range('B2:C4').cells.strarray().indexOf('B2'), "Range('B2:D4').columns.strarray().indexOf('B2')");
  assert.ok(~Quad.Range('B2:C4').cells.strarray().indexOf('B3'), "Range('B2:D4').columns.strarray().indexOf('B3')");
  assert.ok(~Quad.Range('B2:C4').cells.strarray().indexOf('B4'), "Range('B2:D4').columns.strarray().indexOf('B4')");
  assert.ok(~Quad.Range('B2:C4').cells.strarray().indexOf('C2'), "Range('B2:D4').columns.strarray().indexOf('C2')");
  assert.ok(~Quad.Range('B2:C4').cells.strarray().indexOf('C3'), "Range('B2:D4').columns.strarray().indexOf('C3')");
  assert.ok(~Quad.Range('B2:C4').cells.strarray().indexOf('C4'), "Range('B2:D4').columns.strarray().indexOf('C4')");
  assert.ok(!~Quad.Range('B2:C4').cells.strarray().indexOf('C5'), "!Range('B2:D4').columns.strarray().indexOf('C5')");
});

QUnit.test( "Range.extend", function( assert ) {
  assert.ok(Quad.Range("A1:A1").extend().cells.matches(Quad.Range('A1:A1').cells), "Range('A1:A1').extend() == Range('A1:A1')");
  assert.ok(Quad.Range("A1:A1").extend(0,0).cells.matches(Quad.Range('A1:A1').cells), "Range('A1:A1').extend(0,0) == Range('A1:A1')");
  assert.ok(Quad.Range("A1:A1").extend(1,0).cells.matches(Quad.Range('A1:A2').cells), "Range('A1:A1').extend(1,0) == Range('A1:A2')");
  assert.ok(Quad.Range("A1:A1").extend(0,1).cells.matches(Quad.Range('A1:B1').cells), "Range('A1:A1').extend(0,1) == Range('B1:B2')");
  assert.ok(Quad.Range("A1:A1").extend(1,1).cells.matches(Quad.Range('A1:B2').cells), "Range('A1:A1').extend(1,1) == Range('A1:B2')");
  assert.ok(Quad.Range("A1:B2").extend(1,0).cells.matches(Quad.Range('A1:B3').cells), "Range('A1:B2').extend(1,0) == Range('A1:B3')");
  assert.ok(Quad.Range("A1:B2").extend(0,1).cells.matches(Quad.Range('A1:C2').cells), "Range('A1:B2').extend(0,1) == Range('A1:C2')");
  assert.ok(Quad.Range("A1:B2").extend(1,1).cells.matches(Quad.Range('A1:C3').cells), "Range('A1:B2').extend(1,1) == Range('A1:C3')");

  assert.ok(Quad.Range("A1:B2").extend(-1,0).cells.matches(Quad.Range('A1:B1').cells), "Range('A1:B2').extend(-1,0) == Range('A1:B1')");
  assert.ok(Quad.Range("A1:B2").extend(0,-1).cells.matches(Quad.Range('A1:A2').cells), "Range('A1:B2').extend(0,1) == Range('A1:A2')");
  assert.ok(Quad.Range("A1:B2").extend(-1,-1).cells.matches(Quad.Range('A1:A1').cells), "Range('A1:B2').extend(-1,1) == Range('A1:A1')");
  assert.ok(Quad.Range("A1:B2").extend(-2,-2).cells.matches(Quad.Range('A1:A1').cells), "Range('A1:B2').extend(-2,2) == Range('A1:A1')");

  assert.ok(Quad.Range("B2:A1").extend(1,0) == null, "Range('B2:A1').extend(1,0) == null");
  assert.ok(Quad.Range("B2:A1").extend(0,1) == null, "Range('B2:A1').extend(0,1) == null");
  assert.ok(Quad.Range("B2:A1").extend(1,1) == null, "Range('B2:A1').extend(1,1) == null");

  assert.ok(Quad.Range("B2:A1").extend(-1,-1).cells.matches(Quad.Range('B2:B2').cells), "Range('B2:A1').extend(-1,-1) == Range('B2:B2')");
  assert.ok(Quad.Range("B2:A1").extend(-1,0).cells.matches(Quad.Range('B2:A2').cells), "Range('B2:A1').extend(-1,0) == Range('B2:A2')");
  assert.ok(Quad.Range("B2:A1").extend(0,-1).cells.matches(Quad.Range('B2:B1').cells), "Range('B2:A1').extend(0,-1) == Range('B2:B1')");

  assert.ok(Quad.Range("B3:C2").extend(1,0).cells.matches(Quad.Range('B3:C1').cells), "Range('B3:C2').extend(1,0) == Range('B3:C1')");
  assert.ok(Quad.Range("B3:C2").extend(0,1).cells.matches(Quad.Range('B3:D2').cells), "Range('B3:C2').extend(1,0) == Range('B3:D2')");
  assert.ok(Quad.Range("B3:C2").extend(1,1).cells.matches(Quad.Range('B3:D1').cells), "Range('B3:C2').extend(1,0) == Range('B3:D1')");

  assert.ok(Quad.Range("C2:B3").extend(1,0).cells.matches(Quad.Range('C2:B4').cells), "Range('B3:C2').extend(1,0) == Range('C2:B4')");
  assert.ok(Quad.Range("C2:B3").extend(0,1).cells.matches(Quad.Range('C2:A3').cells), "Range('B3:C2').extend(1,0) == Range('C2:A3')");
  assert.ok(Quad.Range("C2:B3").extend(1,1).cells.matches(Quad.Range('C2:A4').cells), "Range('B3:C2').extend(1,0) == Range('C2:A4')");
});

QUnit.test( "Range.cellsInRange", function( assert ) {


  assert.ok(Quad.Range("A1:A1").cellsInRange('B1:B1').cardinality == 0, "Range('A1:A1').cellsInRange('B1:B1').cardinality == 0");
  assert.ok(Quad.Range("A1:A1").cellsInRange('A1:A1').cardinality == 1, "Range('A1:A1').cellsInRange('A1:A1').cardinality == 1");

  var cells = Quad.Range("A1:C3").cellsInRange('B2:D4');

  assert.ok(cells.has('B2') && cells.has('B3') && cells.has('C2') && cells.has('C3'), "Range('A1:C3').cellsInRange('B2:D4') ~= [ 'B2', 'B3', 'C2', 'C3']");
});

QUnit.test( "Collection", function( assert ) {
  assert.ok(Quad.Collection() instanceof Quad.Collection, "Collection() instanceof Collection");
  assert.ok(Quad.Collection('A') instanceof Quad.Collection, "Collection('A') instanceof Collection");
  assert.ok(Quad.Collection('A', 'B', 'C') instanceof Quad.Collection, "Collection('A', 'B', 'C') instanceof Collection");
  assert.ok(Quad.Collection('A1', 'B') instanceof Quad.Collection, "Collection('A1', 'B') instanceof Collection");
  assert.ok(Quad.Collection(['A1', 'B']) instanceof Quad.Collection, "Collection(['A1', 'B']) instanceof Collection");
});



QUnit.test( "Collection.cardinality", function( assert ) {
  assert.ok(Quad.Collection().cardinality == 0, "Collection().cardinality == 0");
  assert.ok(Quad.Collection('A').cardinality == 1, "Collection('A').cardinality == 1");
  assert.ok(Quad.Collection('A', 'B', 'C').cardinality == 3, "Collection('A', 'B', 'C').cardinality == 3");
  assert.ok(Quad.Collection('A1', 'B').cardinality == 2, "Collection('A1', 'B').cardinality == 2");
  assert.ok(Quad.Collection('A1', 1).cardinality == 2, "Collection('A1', 1).cardinality == 2");
  assert.ok(Quad.Collection('A1:B3', 1).cardinality == 2, "Collection('A1:B3', 1).cardinality == 2");
});

QUnit.test( "Collection.matches", function( assert ) {
  assert.ok(Quad.Collection().matches([]), "Collection().matches([])");

  assert.ok(Quad.Collection('A1').matches('A1'), "Collection('A1').matches('A1')");
  assert.ok(Quad.Collection('A1').matches(Quad.Collection('A1')), "Collection('A1').matches(Collection('A1'))");
  assert.ok(!Quad.Collection('A1').matches(['A1', 'B1']), "Collection('A1').matches(['A1', 'B1'])");
  assert.ok(!Quad.Collection('A1').matches(1), "!Collection('A1').matches(1)");
  assert.ok(Quad.Collection('A1:B2').matches('A1:B2'), "Collection('A1:B2').matches(A1:B2)");

  assert.ok(Quad.Collection(1).matches(1), "Collection(1).matches(1)");
  assert.ok(!Quad.Collection(1).matches(2), "!Collection(1).matches(2)");

  assert.ok(!Quad.Collection(['A1', 'B1']).matches(), "!Collection(['A1', 'B1']).matches()");
  assert.ok(!Quad.Collection(['A1', 'B1']).matches('A1'), "!Collection(['A1', 'B1']).matches('A1')");
  assert.ok(!Quad.Collection(['A1', 'B1']).matches('A1', 'B1'), "!Collection(['A1', 'B1']).matches('A1', 'B1')");
  assert.ok(Quad.Collection(['A1', 'B1']).matches(['A1', 'B1']), "Collection(['A1', 'B1']).matches(['A1', 'B1'])");
  assert.ok(Quad.Collection(['A1', 'B1']).matches(Quad.Collection('A1', 'B1')), "Collection(['A1', 'B1']).matches(Collection('A1', 'B1'))");
  assert.ok(Quad.Collection(['A1', 'B1']).matches(['B1', 'B1', 'A1']), "Collection(['A1', 'B1']).matches(['B1', 'A1', 'A1'])");
});

QUnit.test("Collection.add", function(assert) {
  assert.ok(Quad.Collection().add([]).matches([]), "Collection().add([]).matches([])");
  assert.ok(Quad.Collection().add('A').matches('A'), "Collection().add('A').matches('A')");
  assert.ok(Quad.Collection().add('A2').matches('A2'), "Collection().add('A2').matches('A2')");
  assert.ok(Quad.Collection().add(2).matches(2), "Collection().add(2).matches(2)");
  assert.ok(Quad.Collection().add(2).add(3).matches([2,3]), "Collection().add(2).add(3).matches([2,3])");
  assert.ok(Quad.Collection().add(['A1', 'A']).matches(['A1', 'A']), "Collection().add(['A1', 'A']).matches(['A1', 'A'])");
  assert.ok(Quad.Collection().add(['A1']).matches(['A1']), "Collection().add(['A1']).matches(['A1'])");
  assert.ok(Quad.Collection().add(Quad.Collection('A1', 'A2')).matches(['A1', 'A2']), "Collection().add(Collection('A1', 'A2')).matches(['A1', 'A2'])");
});

QUnit.test("Collection.remove", function(assert) {
  assert.ok(Quad.Collection().add('A').remove('A').cardinality == 0, "Collection().add('A').remove('A').cardinality == 0");
  assert.ok(Quad.Collection().add('A').remove('B').cardinality == 1, "Collection().add('A').remove('B').cardinality == 1");
});

QUnit.test("Collection.has", function(assert) {
  assert.ok(Quad.Collection('A').has('A'), "Collection('A').has('A')");
  assert.ok(!Quad.Collection('A').has('B'), "!Collection('A').has('B')");
  assert.ok(Quad.Collection('A2').has('A2'), "Collection('A2').has('A2')");
  assert.ok(Quad.Collection(2).has(2), "Collection(2).has(2)");
  assert.ok(Quad.Collection(2,3).has(2), "Collection(2,3).has(2)");
  assert.ok(!Quad.Collection(2,3).has(1), "!Collection(2,3).has(1)");
});

QUnit.test("Collection.maxRow", function(assert) {
  assert.ok(Quad.Collection().maxRow == null, "!Collection().maxRow");
  assert.ok(Quad.Collection(1).maxRow.number == 1, "Collection(1).maxRow.number == 1");
  assert.ok(Quad.Collection('A').maxRow == null, "!Collection('A').maxRow");
  assert.ok(Quad.Collection('A1').maxRow.number ==1, "Collection('A1').maxRow == 1");
  assert.ok(Quad.Collection('C3:B2').maxRow.number == 3, "Collection('C3:B2').maxRow == 3" );
  assert.ok(Quad.Collection(['A1', 'B2']).maxRow.number == 2, "Collection(['A1', 'B2']).maxRow = 2");
  assert.ok(Quad.Collection(['A', 'B', 'C4']).maxRow.number == 4, "Collection(['A', 'B', 'C4']).maxRow == 4");
});

QUnit.test("Collection.maxColumn", function(assert) {
  assert.ok(Quad.Collection().maxColumn == null, "!Collection().maxColumn");
  assert.ok(Quad.Collection(1).maxColumn == null, "!Collection(1).maxColumn");
  assert.ok(Quad.Collection('A').maxColumn.string == 'A', "Collection('A').maxColumn  == 'A'");
  assert.ok(Quad.Collection('A1').maxColumn.string == 'A', "Collection('A1').maxColumn == 'A'" );
  assert.ok(Quad.Collection('C3:B2').maxColumn.string == 'C', "Collection('C3:B2').maxColumn == 'C'" );
  assert.ok(Quad.Collection(['A1', 'B2']).maxColumn.string == 'B', "Collection(['A1', 'B2'].maxColumn == 'B'" );
  assert.ok(Quad.Collection(['A', 'B', 'C4']).maxColumn.string == 'C', "Collection(['A', 'B', 'C4']).maxColumn == 'C'");
});

QUnit.test( "Quad", function( assert ) {
  assert.ok(Quad() == null, "Quad() == null");
  assert.ok(Quad('A') instanceof Quad.Column, "Quad('A') instanceof Column");
  assert.ok(Quad('A').string == 'A', "Quad('A') == 'A'");
  assert.ok(Quad(1) instanceof Quad.Row, "Quad(1) instanceof Row");
  assert.ok(Quad(1).string == '1', "Quad(1).string == '1'");
  assert.ok(Quad('A1') instanceof Quad.Cell, "Quad('A1') instanceof Cell");
  assert.ok(Quad('A1').string == 'A1', "Quad(1).string == 'A1'");
  assert.ok(Quad('A1:B22') instanceof Quad.Range, "Quad('A1:B22') instanceof Range");
  assert.ok(Quad('A1:B22').string == 'A1:B22', "Quad('A1:B22').string == 'A1:B22'");
});

QUnit.load();
