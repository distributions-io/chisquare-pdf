options( digits = 16 );
library( jsonlite );


df = 4
x = c( -5, -2.5, 0, 2.5, 5 )
y = dchisq( x, df )

cat( y, sep = ",\n" )

data = list(
	df = df,
	data = x,
	expected = y
)

write( toJSON( data, digits = 16, auto_unbox = TRUE ), "./test/fixtures/partial.json" )
