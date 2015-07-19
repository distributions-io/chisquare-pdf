options( digits = 16 );
library( jsonlite );


df = 1
x = seq( -1000, 1000, 0.5 )
y = dchisq( x, df )

cat( y, sep = ",\n" )

data = list(
	df = df,
	data = x,
	expected = y
)

write( toJSON( data, digits = 16, auto_unbox = TRUE ), "./test/fixtures/array.json" )
